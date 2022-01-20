import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

export default function YearSelect() {
  const [years, setYears] = useState(1);
  const number = 1;
  const price = 100;
  const movrPrice = 1;
  return (
    <div>
      <div className="mt-10">
        <div className="grid grid-cols-2">
          <div className="flex justify-center flex-col">
            <div className="flex flex-col ">
              <motion.button
                whileTap={{ opacity: 0.1 }}
                className="text-4xl mx-1 block"
                onClick={() => setYears(years + 1)}
              >
                <BsChevronUp />
              </motion.button>
              <span className="text-yellow text-5xl uppercase pl-3 flex items-center">
                {years} years - ${price} ({movrPrice}{" "}
                <Image
                  src="/movr.png"
                  height="45px"
                  width="33px"
                  alt="Movr logo"
                />
                )
              </span>
              <motion.button
                whileTap={{ opacity: 0.1 }}
                className="text-4xl px-1"
                onClick={() => setYears(years - 1)}
              >
                <BsChevronDown />
              </motion.button>
            </div>
            <div className="mt-4">
              <p className="text-white text-5xl uppercase flex items-center">
                Lifetime - $2500 (10.1{" "}
                <Image
                  src="/movr.png"
                  height="45px"
                  width="33px"
                  alt="Movr logo"
                />
                )
              </p>
            </div>
          </div>
          <div className="border-4 rounded-xl border-gray">
            <div className="bg-yellow text-black text-lg font-bold text-center py-3 rounded-tl-lg rounded-tr-lg">
              <h4>Claiming a domain requires 2 transactions.</h4>
            </div>
            <div className="p-5 text-center space-y-5">
              <p className="">
                1. The first transaction requests to register to domain.
              </p>

              <button className="bg-yellow rounded text-black px-3 py-1">
                Request to Register
              </button>
              <p>
                2. The second transaction completes registration and gives you
                ownership of the domain.
              </p>
              <button className="bg-yellow rounded text-black px-3 py-1">
                Request to Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
