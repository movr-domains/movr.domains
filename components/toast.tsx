import { AnimatePresence, motion } from "framer-motion";

export default function Toast() {
  return (
    <AnimatePresence>
      {false && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bg-green bottom-5 right-5 text-black px-5 py-2 rounded"
        >
          <p>Im a notification</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
