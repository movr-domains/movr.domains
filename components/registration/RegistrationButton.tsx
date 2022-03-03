import classNames from 'classnames';
import { motion } from 'framer-motion';

interface Props {
  step: number;
  text: string;
  time: number;
  claim: () => void;
  register: () => void;
}

export default function RegistrationButton({
  step,
  text,
  time,
  claim,
  register,
}: Props) {
  const timeLeft = (100 / 60) * time;
  const percentageLeft = 100 - timeLeft;

  return (
    <motion.button
      className={classNames(
        'px-5 py-0.5 uppercase font-bold border border-green border-opacity-50 relative hover:border-opacity-100 hover:bg-green hover:text-black transition-colors durations-200',
        {
          'border-0 hover:bg-black hover:text-white': step == 2,
        }
      )}
      onClick={step === 1 ? claim : register}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2, bounce: 0 }}
      disabled={step === 2}
    >
      {text}
    </motion.button>
  );
}
