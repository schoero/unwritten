import { Encapsulation } from "../types/config.js";

export function encapsulate(text: string, encapsulation: Encapsulation) {
  return `${encapsulation[0]}${text}${encapsulation[1]}`;
}