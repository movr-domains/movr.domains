import { AnimatePresence, motion } from 'framer-motion';

export default function Header({ name, step }: { name: string; step: number }) {
  return (
    <div className='mb-5'>
      <h1 className='text-4xl uppercase font-bold flex flex-col text-yellow mb-1 bg-black relative z-10 space-x-3 break-words leading-5'>
        {step === 1 && (
          <motion.span
            key='register'
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 1, bounce: 0 }}
            className='block'
          >
            Register{' '}
          </motion.span>
        )}

        {step === 2 && (
          <motion.span
            key='claiming'
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 1, bounce: 0 }}
            className='block'
          >
            Claiming{' '}
          </motion.span>
        )}

        {step === 3 && (
          <motion.span
            key='registering'
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2, bounce: 0 }}
            className='block'
          >
            Registering
          </motion.span>
        )}
      </h1>
      <motion.span className='text-5xl uppercase font-bold  text-white block m-0'>
        {name}.movr
      </motion.span>
      <AnimatePresence>
        {step === 1 && (
          <motion.p
            exit={{ y: -50, opacity: 0 }}
            className='text-gray leading-4'
            layout
          >
            <span className='text-yellow'>Domain</span>{' '}
            <span className='text-[#00ff00]'>available</span> - 4 letter .movr
            domains are available for $100 per year with a scaling .05% discount
            to each added year.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
