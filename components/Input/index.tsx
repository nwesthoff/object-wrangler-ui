import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = {
  label: string;
};

export default function Input({
  label,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.inputWrapper}>
      {label && <label>{label}</label>}
      <input className={styles.input} {...props} />
    </div>
  );
}
