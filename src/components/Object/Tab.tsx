import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

interface TabsProps {
  readonly tab: any;
  readonly table: any;
  readonly contents: any;
  whichTab: number;
  setTab: Dispatch<SetStateAction<number>>;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({
  table,
  contents,
  tab,
  whichTab,
  setTab,
}: TabsProps) {
  return (
    <div className="w-full p-5 sm:px-0">
      <Tab.Group
        onChange={(index) => {
          setTab(index);
        }}
      >
        <Tab.List className="flex space-x-3 rounded-xl bg-primary p-1">
          {tab &&
            tab.map((category, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 duration-200 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-background text-black"
                      : "text-forth hover:bg-background hover:text-black"
                  )
                }
              >
                {category.name}
              </Tab>
            ))}
        </Tab.List>
        <Tab.Panels className="mt-2 overflow-scroll">
          <table className="w-full">
            <thead className="border-y-2 border-sec sticky">
              <tr>
                {table &&
                  table.map((category, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-5 font-bold border-x border-primary opacity-60"
                    >
                      {category.title}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="">
              {contents &&
                [...Array(contents.length)].map((_, i) => (
                  <tr
                    className="border-b-2 border-opacity-20 border-sec border-double "
                    key={i}
                  >
                    {Object.values(contents[i]).map((obj, id) => (
                      <td
                        key={id}
                        className="px-5 w-max border-x border-primary  "
                      >
                        {obj ? obj : "--"}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
