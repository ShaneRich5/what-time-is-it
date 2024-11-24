import { useForm } from "react-hook-form";
import timezones from "timezones-list";

const TimerForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("onSubmit(data):", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Starting Date and Time</span>
        </div>
        <input
          type="datetime-local"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          {...register("startingDateTime")}
          defaultValue={new Date().toISOString().slice(0, 16)}
        />
        <div className="label">
          <span className="label-text-alt">
            This is starting point for the calculations below
          </span>
        </div>
      </label>

      {/* timezone */}
      {/* <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Starting timezone</span>
        </div>
        <select className="select select-bordered">
          <option
            disabled
            selected
            value={Intl.DateTimeFormat().resolvedOptions().timeZone}
          >
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </option>
          {timezones.map((timezone) => (
            <option value={timezone.tzCode}>{timezone.label}</option>
          ))}
        </select>
        <div className="label">
          <span className="label-text-alt">Detected system timezone </span>
          <span className="label-text-alt">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>
        </div>
      </label> */}

      <div className="flex flex-col space-y-4">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Offset</span>
          </div>
          <select
            className="select select-bordered join-item"
            {...register("offsetModifier")}
            defaultValue="add"
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
        </label>

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
                />
              </label>

              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Minutes</span>
                </div>
                <input
                  type="text"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                />
              </label>

              <label className="form-control w-16">
                <div className="label">
                  <span className="label-text">Seconds</span>
                </div>
                <input
                  type="text"
                  placeholder="00"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TimerForm;
