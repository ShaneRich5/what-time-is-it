import { Sheet } from "react-modal-sheet";
import { useEffect, useState } from "react";
import CountDown from "./countdown";
import Layout from "./layout";
import { add, format, transpose } from "date-fns";
import { tz, TZDate } from "@date-fns/tz";
import TimerForm from "./forms/timer-form";
import { fromZonedTime, toDate, toZonedTime } from "date-fns-tz";

const TIMER_INTERVAL = 1000; // every second

const App = () => {
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  useEffect(() => {
    console.log('=======')
    const staticDateNY = new Date('2024-11-24 10:00:00') // NY
    // console.log(staticDateNY, 'static NY')

    // const chicago1 = new TZDate(2024, 11, 24, 'America/Chicago')
    // let chicagoWithoutTz = new Date('2024-11-24T10:00:00')
    // console.log(chicagoWithoutTz.toString(), 'chicago w/o tz')
    let startingDate = new Date('2024-11-24T10:00:00.000-05:00')

    // let newYork = new TZDate('2024-11-24T10:00:00', 'America/New_York')
    let chicago = new TZDate(2024, 11, 24, 10, 0, 0, 'America/Chicago')
    // let chicago = new TZDate(startingDate, 'America/Chicago')
    // let chicago = new TZDate('2024-11-24T10:00:00', 'America/Chicago')
    // let chicago = fromZonedTime(new Date('2024-11-24T10:00:00Z'), 'America/Chicago')
    let singapore = new TZDate('2024-11-24T10:00:00Z', "Asia/Singapore")

    // console.log(newYork.toString(), 'new york with tz')
    console.log(chicago.toString(), 'chicago with tz')
    // console.log(singapore.toString(), 'singapore with tz')

    chicago = add(chicago, { hours: 1 })
    console.log(chicago.toString(), 'chicago + 1 hour')
    let newYork = toZonedTime(chicago, 'America/New_York')
    console.log(newYork.toString(), 'new york from chicago')
  }, [])

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
