import { HTMLProps } from "react";

export function Input(props: HTMLProps<HTMLInputElement>) {
    return <input {...props} className={`${props.className ?? ""} bg-white text-white bg-opacity-5 border-white border border-opacity-15 p-2 rounded-md focus:outline-none focus:border-opacity-25 focus:bg-opacity-10`} />
}