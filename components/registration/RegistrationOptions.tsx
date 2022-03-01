import { DisplayCosts, YearsSelect } from ".";

interface Props {
  step: number;
  years: number;
  basePrice: number;
  movrPrice: number;
  setYears: (years: number) => void;
}

export default function RegistrationOptions({
  step,
  years,
  basePrice,
  movrPrice,
  setYears,
}: Props) {
  return (
    <div className="grid grid-cols-2 place-items-center">
      <div>
        <p className="uppercase text-dm text-[#555] text-center font-bold tracking-wider">
          Registration Period
        </p>
        <YearsSelect
          step={step}
          years={years}
          setYears={(years: number) => setYears(years)}
        />
      </div>
      <div>
        <p className="uppercase text-dm text-[#555] text-center font-bold tracking-wider">
          Total Cost + Gas
        </p>
        <DisplayCosts
          years={years}
          basePrice={basePrice}
          movrPrice={movrPrice}
          step={step}
        />
      </div>
    </div>
  );
}
