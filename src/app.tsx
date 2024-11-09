import { CSSProperties, useEffect, useState } from "react";

export interface CSSPropertiesWithVars extends CSSProperties {
  '--value': number;
  // any other vars you may use
}

const TIMER_INTERVAL = 1000; // every second

const App = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, TIMER_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": date.getHours() } as CSSPropertiesWithVars}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": date.getMinutes() } as CSSPropertiesWithVars}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": date.getSeconds() } as CSSPropertiesWithVars}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default App;
