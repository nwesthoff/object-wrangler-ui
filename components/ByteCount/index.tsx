import React, { HTMLAttributes, memo } from "react";
import styles from "./styles.module.scss";

type Props = {
  input: any;
  output?: any;
};

function ByteCount({
  input,
  output,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const inputSize =
    new TextEncoder().encode(JSON.stringify(input)).length / 1024;

  const outputSize =
    new TextEncoder().encode(JSON.stringify(output)).length / 1024;

  return (
    <div className={styles.byteCountFlag} {...props}>
      {(outputSize || inputSize).toFixed(2)} Kb{" "}
      <span style={{ opacity: 0.5 }}>
        {outputSize ? `(${((outputSize / inputSize) * 100).toFixed()}%)` : null}
      </span>
    </div>
  );
}

export default memo(ByteCount);
