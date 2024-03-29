import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Pagination from "@/components/Pagination/Pagination";

interface TabsProps {
  readonly tab: any;
  readonly table: any;
  readonly contents: any;
  readonly handlePageChange: any;
  readonly whichPost: any;
  whichTab: number;
  page: number;
  postPerPage: number;
  setTab: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({
  table,
  contents,
  tab,
  whichTab,
  whichPost,
  postPerPage,
  page,
  handlePageChange,
  setTab,
  setPage,
}: TabsProps) {
  return (
    <section className="w-full p-5 sm:px-0 h-full flex flex-col justify-between">
      <div>
        <Tab.Group
          manual
          onChange={(index) => {
            setTab(index);
            setPage(1);
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
          <Tab.Panels className="mt-3 overflow-auto">
            <table className="w-full text-left max-h-full">
              <thead className="border-y-2 bg-gray-200 sticky">
                <tr>
                  {table &&
                    table.map((category, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        className="px-5 font-bold border-x-2 opacity-60 capitalize"
                      >
                        {category.title.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}
                      </th>
                    ))}
                  <th scope="col" className="px-5 font-bold opacity-60">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="content-center">
                {whichPost &&
                  [...Array(whichPost.length)].map((_, i) => (
                    <tr
                      className="border-b-2 border-opacity-30 border-primary border-double "
                      key={i}
                    >
                      {Object.values(whichPost[i]).map((obj, id) => (
                        <td key={id} className="px-5 w-max">
                          {obj ? obj : "--"}
                        </td>
                      ))}
                      <td className="">
                        <div className="flex flex-row justify-center content-center">
                          <button
                            // onClick={()}
                            className="default-button"
                            type="button"
                          >
                            <div className="my-1 mr-1.5 py-1 px-3 bg-primary transition-colors h-max duration-200 hover:bg-primary-500 cursor-pointer rounded-xl ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="white"
                                className="w-8 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>
                            </div>
                          </button>
                          <button
                            // onClick={() => deleteHandler(user.user_id)}
                            className="default-button"
                            type="button"
                          >
                            <div className="border-2 duration-300 hover:bg-red-200 border-red-500 text-red-500 rounded-xl px-2 py-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div>
        <Pagination
          current={page}
          onChange={handlePageChange}
          hasNext={Math.ceil(contents.length / postPerPage)}
          postPerPage={postPerPage}
          contentLength={contents.length}
        />
      </div>
    </section>
  );
}
