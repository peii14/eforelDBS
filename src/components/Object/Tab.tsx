import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

interface ExampleProps {
  readonly tab?: any;
  readonly table?: any;
  readonly subtable?: any;
  whichTab?: number
  setTab?: Dispatch<SetStateAction<number>>
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ table,subtable, tab, whichTab, setTab }: ExampleProps) {
  return (
    // space-x-1 apus dr div
    <div className="w-full px-2 py-16 sm:px-0">
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
          <table className="w-full">
            <thead className="border-y-2 border-sec sticky flex justify-start items-center">
              {table.map((category, idx) => (
            <th key={idx}
            className="px-9 font-bold">
                {category.title}
              </th>
              ))}
            </thead>
            <tbody className="flex justify-start items-center">
              {subtable.map((category, idx) => (
                <Tab
                  key={idx}
                  className="mx-9"
                  >
                    {category.content}
                </Tab>
              ))}
            </tbody>
          </table>
          {/* <table className="w-full mt-2">
            <tbody className="border-y-2 border-sec sticky flex justify-center items-center">
              {table.map((category, idx) => (
                  <tr>
                    <td>
                      <Tab
                        key={idx}
                        className="px-4"
                        >
                          {category.title}
                      </Tab>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
