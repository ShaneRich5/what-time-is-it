import { CSSPropertiesWithVars } from "./interface";

interface CountDownProps {
  targetDate: Date;
  digitsClassNames?: string;
}

const CountDown: React.FC<CountDownProps> = ({ targetDate, digitsClassNames = 'text-9xl' }) => {
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className={`countdown font-mono ${digitsClassNames}`}>
          <span
            style={
              { "--value": targetDate.getHours() } as CSSPropertiesWithVars
            }
          ></span>
        </span>
        hours
      </div>
      <span className={`font-mono ${digitsClassNames}`}>:</span>
      <div className="flex flex-col">
        <span className={`countdown font-mono ${digitsClassNames}`}>
          <span
            style={
              { "--value": targetDate.getMinutes() } as CSSPropertiesWithVars
            }
          ></span>
        </span>
        min
      </div>
      <span className={`font-mono ${digitsClassNames}`}>:</span>
      <div className="flex flex-col">
        <span className={`countdown font-mono ${digitsClassNames}`}>
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

export default CountDown;