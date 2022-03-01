import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  children: React.ReactChild;
  isOpen: boolean;
  close: () => void;
}

export default function Modal({ children, isOpen, close }: ModalProps) {
  useEffect(() => {
    const keyhandler = (event: any) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", keyhandler);

    return () => document.removeEventListener("keydown", keyhandler);
  }, [close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-black bg-opacity-90 fixed top-0 left-0 h-screen w-screen z-40 flex items-center justify-center"
          onClick={(e) => {
            close();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -300 }}
            transition={{
              delay: isOpen ? 0.4 : 0,
              duration: 0.4,
              type: "spring",
              bounce: 0,
            }}
            className="bg-[#111] p-16 pt-10 py-20 max-w-xl w-full relative z-50 -mt-40"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span
              className="absolute right-5 top-4 cursor-pointer text-xl hover:text-green transition-colors"
              onClick={close}
            >
              <AiOutlineClose />
            </span>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
