import React, { memo } from "react";

type Props = {
  input: any;
};

function FormatJSON({ input }: Props) {
  return (
    <pre style={{ fontFamily: "monospace" }}>
      {JSON.stringify(input, null, "  ")}
    </pre>
  );
}

export default memo(FormatJSON);
