import { TonalAccidentalKey, TonalMode, TonalSignature } from "@/types";

export function getKeySignatureNotation(
  key: TonalAccidentalKey,
  mode: TonalMode
): TonalSignature {
  return `${key} ${mode}`;
}
