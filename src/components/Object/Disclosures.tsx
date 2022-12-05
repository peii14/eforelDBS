import Neuromorphism from "./Neuromorphism";
import { Dispatch, SetStateAction, useState } from "react";
import AnimateHeight from "react-animate-height";

interface DisclosuresProps {
  isOpen?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  content?: any;
}

const Disclosures = ({
  isOpen = false,
  setOpen,
  content = [],
}: DisclosuresProps) => {
  function handleClick() {
    if (isOpen) setOpen(false);
    else setOpen(true);
  }

  return (
    <div onClick={handleClick} className={`group max-h-fit duration-500`}>
      <Neuromorphism whichNeuro={1}>
        <div className={`relative flex flex-col items-center `}>
          <div className="relative z-20 h-36 w-full duration-500  group-hover:-translate-y-5"></div>
          <div className="z-10 ">
            <AnimateHeight
              duration={500}
              height={`${isOpen ? "auto" : "auto"}`}
            >
              <p className=" pb-10 pt-5 text-center">{content.name}</p>
            </AnimateHeight>
          </div>
        </div>
      </Neuromorphism>
    </div>
  );
};

export default Disclosures;
