import { HTMLProps } from "react";

export function Input(props: HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`${props.className ?? ""} rounded-md border border-white border-opacity-15 bg-white bg-opacity-5 p-2 text-white focus:border-opacity-25 focus:bg-opacity-10 focus:outline-none`}
    />
  );
}
