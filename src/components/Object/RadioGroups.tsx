import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import { RadioGroup } from "@headlessui/react";

type RadioGroupsProps = {
  readonly plans?: any;
  selected?: any;
  readonly title?: string;
  readonly columns?: number;
  selectedGroup: any;
  setSelectedGroup: Dispatch<SetStateAction<any>>;
  setSelected?: Dispatch<SetStateAction<any>>;
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const RadioGroups = ({
  plans,
  selected,
  title = "-",
  setSelected,
  columns = 1,
  setSelectedGroup,
  selectedGroup,
}: RadioGroupsProps) => {
  useEffect(() => {
    if (plans[0].Group) {
      setSelectedGroup(null);
    }
  }, [selected]);

  return (
    <div className="w-full p-4">
      <div className="mx-auto w-full">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">{title}</RadioGroup.Label>
          <div className={`gap-3 grid grid-cols-${columns}`}>
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan.name}
                className={({ active, checked }) =>
                  ` ${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-green-700"
                      : ""
                  }
                ${
                  checked
                    ? `bg-primary bg-opacity-75 text-white ${
                        plan.Group && plan.Group.length > 0 ? "h-max" : ""
                      } `
                    : "bg-white"
                }
                  relative flex cursor-pointer rounded-lg h-10 px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {plan.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="div"
                              className={`${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            ></RadioGroup.Description>
                            <ul
                              className={`${
                                plan.Group && plan.Group.length > 0 && checked
                                  ? "block"
                                  : "hidden"
                              } absolute z-20 bg-background top-full mt-2 shadow-lg shadow-primary-500 w-full left-0 text-black p-3 max-h-36 overflow-y-auto rounded-xl flex flex-col gap-2`}
                            >
                              {plan.Group && plan.Group.length > 0 && checked
                                ? plan.Group.map((group, idx: number) => {
                                    return (
                                      <li
                                        className={`hover:bg-primary-500 cursor-pointer hover:text-white rounded-xl px-3 py-1 ${
                                          selectedGroup === group.group_id
                                            ? "bg-primary-500 text-white"
                                            : ""
                                        } `}
                                        key={idx}
                                        onClick={() =>
                                          setSelectedGroup(group.group_id)
                                        }
                                      >
                                        {group.group_name}
                                      </li>
                                    );
                                  })
                                : ""}
                            </ul>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default RadioGroups;
