import { CSSProperties } from "react"

export interface CSSPropertiesWithVars extends CSSProperties {
  "--value": number;
  // any other vars you may use
}

export interface StaticTimer {
  name: string;
  startingDateTime: string;
  startingTimezone: string;
  offsetModifier: string;
  offsetYears: number;
  offsetMonths: number;
  offsetWeeks: number;
  offsetDays: number;
  offsetHours: number;
  offsetMinutes: number;
  offsetSeconds: number;
  targetTimezone: string;
};
