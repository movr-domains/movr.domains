import ProgressBar from './ProgressBar';
import { DisplayCosts, YearsSelect } from '.';

interface Props {
  step: number;
  years: number;
  basePrice: number;
  movrPrice: number;
  time: number;
  setYears: (years: number) => void;
}

export default function RegistrationOptions({
  step,
  years,
  basePrice,
  movrPrice,
  setYears,
  time,
}: Props) {
  return (
    <div>
      {step == 2 && (
        <div className='mb-2'>
          <span className='text-[#333] font-bold font-cabin uppercase'>
            After the claiming process you will be able to register your name
          </span>
        </div>
      )}
      <div className='grid grid-cols-2 place-items-center'>
        <div>
          <p className='uppercase text-sm text-[#555] text-center font-bold tracking-wider'>
            Registration Period
          </p>
          <YearsSelect
            step={step}
            years={years}
            setYears={(years: number) => setYears(years)}
          />
        </div>
        <div>
          <p className='uppercase text-sm text-[#555] text-center font-bold tracking-wider'>
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
    </div>
  );
}
