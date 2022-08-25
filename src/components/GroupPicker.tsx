import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import {
  HiCheck as CheckIcon,
  HiSelector as SelectorIcon,
} from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';

export default function GroupPicker({ state, groupsState }) {
  const [selected, setSelected] = state;
  const [groups, setGroups] = groupsState;

  const { user } = useAuth();

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected || 'Choose a group'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {groups.map((group) => (
                <Listbox.Option
                  key={group._id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-14 pr-4 my-2 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={group.name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {group.name}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-500">
                        <img
                          src={
                            group.profileImage ||
                            'https://lh3.googleusercontent.com/a/default-user'
                          }
                          alt={group.name}
                          className="h-8 w-8 rounded-full"
                        />
                        {selected ? (
                          <CheckIcon
                            className="-ml-8 h-8 w-8 rounded-full border-2 border-amber-500 bg-white/25"
                            aria-hidden="true"
                          />
                        ) : null}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
