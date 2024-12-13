import { useForm } from "react-hook-form";
import timezones from "timezones-list";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { add, format, formatRelative, sub } from "date-fns";
import { fromZonedTime, toDate, toZonedTime } from "date-fns-tz";
import { changeTimezone } from "../utils";
import { TZDate } from "@date-fns/tz";
import { StaticTimer } from "../interface";


const convertToTimeZone = (dateString: string, timeZone: string) => {
  const startingDate = new Date(dateString)
  const d = new TZDate(
    startingDate.getFullYear(),
    startingDate.getMonth(),
    startingDate.getDay(),
    startingDate.getHours(),
    startingDate.getMinutes(),
    startingDate.getSeconds(),
    timeZone
  )

  console.log(d, d.toString(), 'd')

  return d
};

const computeTargetDate = (data: StaticTimer) => {
  const {
    startingDateTime,
    startingTimezone,
    offsetModifier,
    offsetYears,
    offsetMonths,
    offsetWeeks,
    offsetDays,
    offsetHours,
    offsetMinutes,
    offsetSeconds,
    targetTimezone,
  } = data;

  // let target = new Date();
  let target = convertToTimeZone(startingDateTime, startingTimezone);
  // let target = changeTimezone(new Date(startingDateTime), startingTimezone);

  const offset = {
    years: +offsetYears,
    months: +offsetMonths,
    weeks: +offsetWeeks,
    days: +offsetDays,
    hours: +offsetHours,
    minutes: +offsetMinutes,
    seconds: +offsetSeconds,
  };

  if (offsetModifier === "add") {
    target = add(target, offset);
  } else {
    target = sub(target, offset);
  }

  console.log("target:", target.toString());

  return toDate(target, { timeZone: targetTimezone });

  // return target;
  // console.log("target:", target.toString());
  // return toZonedTime(target, data.targetTimezone);
  // return toDate(target, data.targetTimezone);

};

const TimerForm = () => {
  const { register, handleSubmit, control, watch } = useForm<StaticTimer>({
    defaultValues: {
      startingDateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      startingTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      offsetModifier: "add",
      offsetYears: 0,
      offsetMonths: 0,
      offsetWeeks: 0,
      offsetDays: 0,
      offsetHours: 0,
      offsetMinutes: 0,
      offsetSeconds: 0,
    },
  });

  const [targetDate, setTargetDate] = useState(TZDate.now());

  // console.log('watch all:', watch())

  const onSubmit = (data: any) => {
    console.log("onSubmit(data):", data);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // console.log("watch:", value, name, type);
      // console.log("computeTargetDate(value):", computeTargetDate(value));
      setTargetDate(computeTargetDate(value));
    });

    // console.log("here");

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="card-title">Starting Point</div>

            <div className="flex space-x-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Name</span>
                  <span className="label-text-alt">(Optional)</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name")}
                />
              </label>

              {/* <div className="flex flex-col space-y-4"> */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Offset</span>
                </div>
                <select
                  className="select select-bordered join-item"
                  defaultValue="add"
                  {...register("offsetModifier")}
                >
                  <option value="add">Add</option>
                  <option value="subtract">Subtract</option>
                </select>
              </label>
            </div>

            <div className="flex space-x-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Starting Date and Time</span>
                </div>
                <input
                  type="datetime-local"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  {...register("startingDateTime")}
                />
                <div className="label">
                  <span className="label-text-alt">
                    This is starting point for the calculations below
                  </span>
                </div>
              </label>

              {/* starting timezone */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Starting timezone</span>
                </div>
                <select
                  className="select select-bordered"
                  defaultValue={
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  }
                  {...register("startingTimezone")}
                >
                  {timezones.map((timezone) => (
                    <option key={timezone.tzCode} value={timezone.tzCode}>
                      {timezone.label}
                    </option>
                  ))}
                </select>
                <div className="label">
                  <span className="label-text-alt">
                    Detected system timezone{" "}
                  </span>
                  <span className="label-text-alt">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="card shadow">
          <div className="card-body">
            <div className="card-title">Date Offset</div>
            <div className="flex space-x-4">
              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Years</span>
                </div>
                <input
                  type="number"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("offsetYears")}
                />
              </label>
              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Months</span>
                </div>
                <input
                  type="number"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("offsetMonths")}
                />
              </label>
              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Weeks</span>
                </div>
                <input
                  type="number"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("offsetWeeks")}
                />
              </label>
              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Days</span>
                </div>
                <input
                  type="number"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("offsetDays")}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="card shadow">
          <div className="card-body">
            <div className="card-title">Time Offset</div>
            <div className="flex space-x-4">
              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Hours</span>
                </div>
                <input
                  type="number"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("offsetHours")}
                />
              </label>

              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Minutes</span>
                </div>
                <input
                  type="number"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("offsetMinutes")}
                />
              </label>

              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Seconds</span>
                </div>
                <input
                  type="number"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("offsetSeconds")}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="card shadow">
          <div className="card-body">
            <div className="card-title">Target Date Time</div>
            {targetDate.toString()}

            <div className="flex space-x-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Target</span>
                </div>
                <input
                  type="text"
                  disabled
                  className="input input-bordered w-full max-w-xs"
                  value={targetDate.toString()}
                />
                <div className="label">
                  <span className="label-text-alt">
                    The calculated target date and time
                  </span>
                </div>
              </label>

              {/* target timezone */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Target timezone</span>
                </div>
                <select
                  className="select select-bordered"
                  defaultValue={
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  }
                  {...register("targetTimezone")}
                >
                  {timezones.map((timezone) => (
                    <option key={timezone.tzCode} value={timezone.tzCode}>
                      {timezone.label}
                    </option>
                  ))}
                </select>
                <div className="label">
                  <span className="label-text-alt">
                    Detected system timezone{" "}
                  </span>
                  <span className="label-text-alt">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </span>
                </div>
              </label>
            </div>

            {/* <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Target (with timezone)</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                disabled
                value={targetDate.toString()}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Target (relative)</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                disabled
                value={formatRelative(targetDate, new Date())}
              />
            </label> */}
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default TimerForm;
