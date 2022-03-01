import classNames from "classnames";
import { motion } from "framer-motion";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { YearSelectButton } from ".";

interface YearsSelectProps {
  step: number;
  years: number;
  setYears: (years: number) => void;
}

export default function YearsSelect({
  step,
  years,
  setYears,
}: YearsSelectProps) {
  const hiddenInputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const editYears = () => {
    if (hiddenInputRef?.current) {
      // @ts-ignore
      hiddenInputRef.current.focus();
    }
  };

  const handleYearsChange = (number: number) => {
    if (isNaN(years) && number == 1) {
      setYears(1);
      return;
    }

    setYears(years + number);
  };

  useEffect(() => {
    if (years >= 1000) {
      setYears(999);
    }

    if (years <= 0) {
      setYears(NaN);
    }
  }, [years, setYears]);

  return (
    <React.Fragment>
      <div>
        <div className="flex items-center justify-center ">
          <YearSelectButton
            onClick={() => handleYearsChange(-1)}
            Icon={FaChevronDown}
            enabled={step !== 1 ? true : false}
            direction="down"
          />
          <motion.span
            className={classNames(
              "text-4xl font-bold uppercase w-44 text-center ",
              {
                "text-[#333]": step !== 1,
              }
            )}
          >
            <span
              onClick={editYears}
              className={classNames({
                "cursor-pointer": step === 1,
                "cursor-default": step !== 1,
              })}
            >
              <span
                className={classNames({
                  "text-gray": focused,
                })}
              >
                {years ? years : 0}
              </span>{" "}
              {years === 1 ? "Year" : "Years"}
            </span>
            <form
              className="fixed -top-80 left-96"
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                if (hiddenInputRef?.current) {
                  // @ts-ignore
                  hiddenInputRef.current.blur();
                }
              }}
            >
              <input
                type="number"
                value={years}
                onFocus={() => setFocused(step === 1 ? true : false)}
                onBlur={() => setFocused(false)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setYears(parseInt(e.target.value))
                }
                ref={hiddenInputRef}
                disabled={step !== 1}
              />
            </form>
          </motion.span>
          <YearSelectButton
            onClick={() => handleYearsChange(1)}
            Icon={FaChevronUp}
            enabled={step !== 1 ? true : false}
            direction="up"
          />
        </div>
      </div>
    </React.Fragment>
  );
}