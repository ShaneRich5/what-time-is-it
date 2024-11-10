import { CSSProperties, useEffect, useState } from "react";

export interface CSSPropertiesWithVars extends CSSProperties {
  "--value": number;
  // any other vars you may use
}

const TIMER_INTERVAL = 1000; // every second

const App = () => {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, TIMER_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="countdown font-mono text-9xl">
            <span
              style={{ "--value": currentDate.getHours() } as CSSPropertiesWithVars}
            ></span>
          </span>
          hours
        </div>
        <span className="font-mono text-9xl">:</span>
        <div className="flex flex-col">
          <span className="countdown font-mono text-9xl">
            <span
              style={{ "--value": currentDate.getMinutes() } as CSSPropertiesWithVars}
            ></span>
          </span>
          min
        </div>
        <span className="font-mono text-9xl">:</span>
        <div className="flex flex-col">
          <span className="countdown font-mono text-9xl">
            <span
              style={{ "--value": currentDate.getSeconds() } as CSSPropertiesWithVars}
            ></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default App;
