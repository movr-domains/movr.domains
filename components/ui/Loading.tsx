import { Bars } from 'react-loading-icons';

interface LoadingProps {
  text?: string;
  hideText?: boolean;
}

export default function Loading({
  text = 'Loading',
  hideText = false,
}: LoadingProps) {
  return (
    <div className='flex flex-col items-center text-center'>
      <Bars height='2em' speed={0.5} fill='#53CBC8' />
      {!hideText && (
        <div className='uppercase font-cabin text-sm'>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}
