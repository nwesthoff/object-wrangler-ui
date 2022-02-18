import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import FormatJSON from "../components/HighlightJson";
import { useDebounce } from "use-debounce";
import ByteCount from "../components/ByteCount";
import Input from "../components/Input";
import { extendedPick } from "../utils/extendedPick";

type Props = {};

export default function ObjectScanPage({}: Props) {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [inputData, setInputData] = useState(null);
  const [error, setError] = useState<Error>(null);
  const [startKeyInput, setStartKeyInput] = useState("");
  const [scanString, setScanString] = useState("");

  const [debouncedUrlInput] = useDebounce(urlInput, 500);
  const [debouncedScanString] = useDebounce(scanString, 500);
  const [debouncedStartKeyInput] = useDebounce(startKeyInput, 500);

  const outputData = useMemo(() => {
    try {
      setError(null);
      if (!inputData) return null;

      return extendedPick(
        inputData[debouncedStartKeyInput],
        JSON.parse(debouncedScanString)
      );
    } catch (e) {
      setError(e);
      return null;
    }
  }, [inputData, debouncedScanString, debouncedStartKeyInput]);

  useEffect(() => {
    setError(null);
    if (urlInput?.length < 3) return;

    const res = fetch(urlInput);
    res
      .then((res) => res.json())
      .then((res) => setInputData(res))
      .catch((e) => setError(e));
  }, [urlInput]);

  useEffect(() => {
    if (urlInput.length < 3) return;

    router.query.url = urlInput;
    router.query.scanString = scanString;
    router.query.startKeyInput = startKeyInput;
    router.push(router);
  }, [debouncedUrlInput, debouncedScanString, debouncedStartKeyInput]);

  useEffect(() => {
    if (router.isReady) {
      const { url, scanString, startKeyInput } = router.query;
      startKeyInput && setStartKeyInput(startKeyInput as string);
      url && setUrlInput(url as string);
      scanString && setScanString(scanString as string);
    }
  }, [router.isReady]);

  const selectedInputData =
    debouncedStartKeyInput && debouncedStartKeyInput !== ""
      ? inputData[debouncedStartKeyInput]
      : inputData;

  return (
    <div>
      <div
        style={{
          top: 0,
          position: "sticky",
          zIndex: 5,
          width: "100%",
          background: "lightgrey",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: 12,
            width: "100%",
          }}
        >
          <Input
            label="Data URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.currentTarget.value)}
          />

          <Input
            label="Start From Key"
            value={startKeyInput}
            onChange={(e) => setStartKeyInput(e.currentTarget.value)}
          />

          <Input
            label="Scan String"
            type="text"
            value={scanString}
            onChange={(e) => {
              try {
                setScanString(e.currentTarget.value);
              } catch (e) {
                setError(e);
              }
            }}
          />
        </div>

        <div style={{ width: "100%", position: "relative" }}>
          {inputData && <ByteCount input={inputData} />}
          {outputData && (
            <ByteCount
              input={inputData}
              style={{ right: 0 }}
              output={outputData}
            />
          )}
        </div>

        {error && (
          <div
            style={{
              top: 5,
              right: 5,
              position: "absolute",
              background: "red",
              color: "white",
              padding: 5,
              borderRadius: 5,
            }}
          >
            {error.message}
          </div>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", position: "relative", overflow: "auto" }}>
          {selectedInputData && (
            <FormatJSON
              input={
                Array.isArray(selectedInputData)
                  ? selectedInputData.slice(0, 3)
                  : selectedInputData
              }
            />
          )}
        </div>
        <div
          style={{
            width: "50%",
            overflow: "auto",
            position: "relative",
            background: !outputData ? "pink" : "none",
          }}
        >
          {(outputData || inputData) && (
            <FormatJSON input={outputData || inputData} />
          )}
        </div>
      </div>
    </div>
  );
}
