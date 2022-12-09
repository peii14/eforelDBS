import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

interface ExampleProps {
  readonly tab?: any;
  readonly table?: any;
  whichTab?: number
  setTab?: Dispatch<SetStateAction<number>>
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ table, tab, whichTab, setTab }: ExampleProps) {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group
      onChange={(index) => {
       setTab(index)
      }}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tab.map((category,idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <table className="min-w-full ">
            <thead className="border-y-2 border-sec sticky">
              {/* {table.map()} */}
            </thead>
            <tbody>

            </tbody>
          </table>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
