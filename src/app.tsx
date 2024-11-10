import { useEffect, useState } from "react";
import CountDown from "./countdown";
import Layout from "./layout";

const TIMER_INTERVAL = 1000; // every second

const App = () => {
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
    <Layout>
      <div className="flex items-center justify-center">
        <CountDown targetDate={currentDate} />
      </div>
      <div className="text-center mt-4">
        <span className="text-5xl">{currentTimezone}</span>
      </div>
      <div className="my-4">
        <button className="btn">Add</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="card outline-1 border-2 border-black">
          <div className="card-body">
            <h2 className="card-title">Time 1</h2>
            <CountDown targetDate={currentDate} digitsClassNames="text-2xl"/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
