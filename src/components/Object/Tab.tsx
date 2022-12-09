import { useState } from "react";
import { Tab } from "@headlessui/react";

interface ExampleProps {
  readonly categories?: any;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ categories }: ExampleProps) {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
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
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <table className="min-w-full ">
            <thead className="border-y-2 border-sec sticky">
              <tr>
                {Object.entries(categories).map(([key, value], idx) => {
                  return (
                    <th key={idx} className="px-5 text-left">
                      {key}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {/* <tbody>
                      {post.map((product) => (
                        <tr
                          key={product._id}
                          className="border-b-2 border-sec border-double border-opacity-20"
                        >
                          <td className=" p-5 ">
                            {product._id.substring(20, 24)}
                          </td>
                          <td className=" p-5 ">{product.title}</td>
                          <td className=" p-5 ">{product.link}</td>

                          <td className=" p-5 ">
                            <button
                              onClick={() => deleteHandler(product._id)}
                              className="default-button"
                              type="button"
                            >
                              <Button btn="Delete" whichBtn={2} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody> */}
          </table>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
