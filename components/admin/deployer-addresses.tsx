import { BsClipboardCheck } from "react-icons/bs";
import { motion } from "framer-motion";
import deployedAddresses from "../../constants/contracts/local.json";

export default function DeployerAddresses() {
  return (
    <div className="mt-5">
      <h3 className="text-yellow text-2xl font-bold">
        Deployer Contract Addresses
      </h3>
      <span>
        {Object.entries(deployedAddresses).map((value, key) => (
          <span key={key} className="flex items-center space-x-3">
            <a
              className="block"
              href={`https://moonbase.moonscan.io/address/${value[1]}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-bold">{value[0]}</span>: {value[1]}
            </a>
            <motion.span
              className="text-white"
              onClick={() => navigator.clipboard.writeText(value[1])}
              whileTap={{ scale: 0.8 }}
            >
              <BsClipboardCheck />
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  );
}
