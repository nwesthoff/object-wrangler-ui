import React, { HTMLAttributes, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = {
  label: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
};

export default function Input({
  label,
  wrapperProps,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.inputWrapper} {...wrapperProps}>
      {label && <label>{label}</label>}
      <input className={styles.input} {...props} />
    </div>
  );
}
