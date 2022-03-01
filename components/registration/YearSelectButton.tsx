import classNames from "classnames";
import { motion } from "framer-motion";
import { IconType } from "react-icons/lib";

export default function YearSelectButton({
  onClick,
  Icon,
  enabled,
  direction,
}: {
  onClick: () => void;
  Icon: IconType;
  enabled: boolean;
  direction: "up" | "down";
}) {
  return (
    <motion.button
      disabled={enabled}
      className={classNames(
        "h-8 w-8 flex items-center justify-center text-2xl font-bold",
        { "text-[#222]": enabled, "text-yellow": !enabled }
      )}
      onClick={onClick}
      whileTap={{ y: direction === "up" ? -10 : 10 }}
      transition={{ bounce: 0, duration: 0.2 }}
    >
      <Icon />
    </motion.button>
  );
}
