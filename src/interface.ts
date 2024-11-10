import { CSSProperties } from "react"

export interface CSSPropertiesWithVars extends CSSProperties {
  "--value": number;
  // any other vars you may use
}