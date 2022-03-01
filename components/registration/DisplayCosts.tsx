import classNames from "classnames";
import Image from "next/image";

interface DisplayCostsProps {
  years: number;
  basePrice: number;
  movrPrice: number;
  step: number;
}

export default function DisplayCosts({
  years,
  basePrice,
  movrPrice,
  step,
}: DisplayCostsProps) {
  const totalPrice = !isNaN(years) ? movrPrice * years : 0;
  return (
    <div>
      <div className="font-bold text-4xl">
        <div
          className={classNames("flex items-end", {
            "text-[#333]": step !== 1,
          })}
        >
          <span className="block mr-1">{totalPrice.toFixed(3)}</span>

          <div
            className={classNames("flex items-end", {
              grayscale: step !== 1,
            })}
          >
            <Image
              src="/moonriver-logo.png"
              width="35px"
              height="35px"
              alt="Moonriver logo"
            />
          </div>

          <span
            className={classNames("text-xl ml-2 block", {
              "text-[#222]": step !== 1,
              "text-yellow": step === 1,
            })}
          >
            (${!isNaN(years * basePrice) ? years * basePrice : 0})
          </span>
        </div>
      </div>
    </div>
  );
}
