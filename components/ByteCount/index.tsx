import React, { HTMLAttributes, memo } from "react";
import styles from "./styles.module.scss";

type Props = {
  input: any;
};

function ByteCount({
  input,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const size = (
    new TextEncoder().encode(JSON.stringify(input)).length / 1024
  ).toFixed(2);

  return (
    <div className={styles.byteCountFlag} {...props}>
      {size} Kb
    </div>
  );
}

export default memo(ByteCount);
