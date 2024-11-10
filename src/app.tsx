import { CSSProperties, useEffect, useState } from "react";

export interface CSSPropertiesWithVars extends CSSProperties {
  "--value": number;
  // any other vars you may use
}

interface CountDownProps {
  targetDate: Date;
}

const CountDown: React.FC<CountDownProps> = ({ targetDate }) => {
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-9xl">
          <span
            style={
              { "--value": targetDate.getHours() } as CSSPropertiesWithVars
            }
          ></span>
        </span>
        hours
      </div>
      <span className="font-mono text-9xl">:</span>
      <div className="flex flex-col">
        <span className="countdown font-mono text-9xl">
          <span
            style={
              { "--value": targetDate.getMinutes() } as CSSPropertiesWithVars
            }
          ></span>
        </span>
        min
      </div>
      <span className="font-mono text-9xl">:</span>
      <div className="flex flex-col">
        <span className="countdown font-mono text-9xl">
          <span
            style={
              { "--value": targetDate.getSeconds() } as CSSPropertiesWithVars
            }
          ></span>
        </span>
        sec
      </div>
    </div>
  );
};

const TIMER_INTERVAL = 1000; // every second

const App = () => {
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
      <CountDown targetDate={currentDate} />
    </div>
  )
};

export default App;
