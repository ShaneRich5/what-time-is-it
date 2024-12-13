import { Sheet } from "react-modal-sheet";
import { useEffect, useState } from "react";
import CountDown from "./countdown";
import Layout from "./layout";
import { add, format, transpose } from "date-fns";
import { tz } from "@date-fns/tz";
import TimerForm from "./forms/timer-form";

const TIMER_INTERVAL = 1000; // every second

const App = () => {
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

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
      <div className="card outline-1 border-2 border-black">
        <div className="card-body">
          <h2 className="card-title">
            {format(currentDate, "MMM dd, yyyy")} | {currentTimezone}
          </h2>
          <CountDown targetDate={currentDate} />
        </div>
      </div>

      <div className="my-4">
        <button className="btn" onClick={() => setIsOpenAddModal(true)}>
          Add
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Time in future */}
        <div className="card outline-1 border-2 border-black">
          <div className="card-body">
            <h2 className="card-title">2 hours from now</h2>
            <CountDown
              targetDate={add(currentDate, { hours: 2 })}
              digitsClassNames="text-2xl"
            />
          </div>
        </div>
        {/* Japan Time */}
        <div className="card outline-1 border-2 border-black">
          <div className="card-body">
            <h2 className="card-title">2 hours from now</h2>
            <CountDown
              targetDate={transpose(currentDate, tz("America/Chicago"))}
              digitsClassNames="text-2xl"
            />
          </div>
        </div>
      </div>

      <Sheet isOpen={isOpenAddModal} onClose={() => setIsOpenAddModal(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="p-4">
              <h2 className="text-2xl font-bold">Add Countdown</h2>
              <div className="mt-4">
                <TimerForm />


              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </Layout>
  );
};

export default App;
