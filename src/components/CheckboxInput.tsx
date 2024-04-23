import { HTMLProps } from "react";

export function CheckboxInput(props: HTMLProps<HTMLInputElement>) {
    return <input {...props} className={`${props.className ?? ""}`} type="checkbox" />
}