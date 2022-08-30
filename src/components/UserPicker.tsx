import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  HiCheck as CheckIcon,
  HiOutlinePlusCircle as PlusCircleIcon,
  HiSelector as SelectorIcon,
} from "react-icons/hi";

export default function UserPicker({ selectedState, onSelect, showButton }) {
  const [selected, setSelected] = selectedState;
  const [query, setQuery] = useState("");

  const [filteredPeople, setFilteredPeople] = useState([]);
  let lastQuery = "";
  useEffect(() => {
    if (query?.length < 3 || query === lastQuery) {
      setFilteredPeople([]);
      return;
    }
    fetch(`/api/users?q=${encodeURIComponent(query)}`).then((response) =>
      response.json().then((json) => setFilteredPeople(json))
    );
    lastQuery = query;
  }, [query]);

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1 flex gap-4">
        <div className="relative grow cursor-default overflow-hidden rounded-lg bg-zinc-800 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="bg-zinc-800 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-200 outline-none focus:ring-0"
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a user to add"
            autoComplete="off"
            spellCheck={false}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 hidden items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-10 max-h-60 w-full overflow-auto rounded-md bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
            {/*   eslint-disable-next-line no-nested-ternary */}
            {query?.length < 3 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-500">
                Type 3+ characters to begin searching.
              </div>
            ) : filteredPeople.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.uid}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-emerald-100 text-emerald-900" : "text-white"
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person?.name}
                      </span>
                      {selected && false ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-amber-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-amber-600"
                        }`}
                      >
                        <img
                          src={person.profileImage}
                          alt={person.name}
                          className="h-5 w-5 rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
        {showButton !== false && (
          <div className="flex items-center">
            <button
              onClick={() => onSelect(null)}
              className="rounded-md border border-transparent bg-amber-600 py-2 px-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-amber-500 focus:border-amber-700 focus:outline-none focus:outline-amber-800 active:bg-amber-700"
            >
              <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </Combobox>
  );
}
