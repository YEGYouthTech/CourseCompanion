import { Dialog, Transition } from "@headlessui/react";
import { setUncaughtExceptionCaptureCallback } from "process";
import type { Dispatch, SetStateAction } from "react";
import { Fragment, useRef } from "react";
// import { ExclamationIcon } from '@heroicons/react/outline';

type IBaseModalProps = {
  state: [boolean, Dispatch<SetStateAction<boolean>>]; // TODO
  color: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  btn1text: string;
  btn1handler?: () => void;
  btn2text: string;
  btn2handler?: () => void;
};

export default function BaseModal({
  state,
  color,
  icon,
  title,
  children,
  btn1text,
  btn1handler,
  btn2text,
  btn2handler,
}: IBaseModalProps) {
  const [open, setOpen] = state;

  const cancelButtonRef = useRef(null);
  if (open) {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => setOpen(false)}
        >
          {/* HACK: The next line loads the Tailwind color classes to make them available. */}
          {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
          <span className="hidden bg-red-100 bg-red-600 bg-orange-100 bg-orange-600 bg-amber-100 bg-amber-600 bg-yellow-100 bg-yellow-600 bg-lime-100 bg-lime-600 bg-green-100 bg-green-600 bg-emerald-100 bg-emerald-600 bg-teal-100 bg-teal-600 bg-cyan-100 bg-cyan-600 bg-sky-100 bg-sky-600 bg-blue-100 bg-blue-600 bg-indigo-100 bg-indigo-600 bg-violet-100 bg-violet-600 bg-purple-100 bg-purple-600 bg-fuchsia-100 bg-fuchsia-600 bg-pink-100 bg-pink-600 bg-rose-100 bg-rose-600 text-red-600 text-orange-600 text-amber-600 text-yellow-600 text-lime-600 text-green-600 text-emerald-600 text-teal-600 text-cyan-600 text-sky-600 text-blue-600 text-indigo-600 text-violet-600 text-purple-600 text-fuchsia-600 text-pink-600 text-rose-600 hover:bg-red-700 hover:bg-orange-700 hover:bg-amber-700 hover:bg-yellow-700 hover:bg-lime-700 hover:bg-green-700 hover:bg-emerald-700 hover:bg-teal-700 hover:bg-cyan-700 hover:bg-sky-700 hover:bg-blue-700 hover:bg-indigo-700 hover:bg-violet-700 hover:bg-purple-700 hover:bg-fuchsia-700 hover:bg-pink-700 hover:bg-rose-700 focus:ring-red-500 focus:ring-orange-500 focus:ring-amber-500 focus:ring-yellow-500 focus:ring-lime-500 focus:ring-green-500 focus:ring-emerald-500 focus:ring-teal-500 focus:ring-cyan-500 focus:ring-sky-500 focus:ring-blue-500 focus:ring-indigo-500 focus:ring-violet-500 focus:ring-purple-500 focus:ring-fuchsia-500 focus:ring-pink-500 focus:ring-rose-500"></span>
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900/75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={
                        `bg-${color}-100` +
                        " mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                      }
                    >
                      {/* <ExclamationIcon
                      className={`text-${color}-600` + ' h-6 w-6'}
                      aria-hidden="true"
                    /> */}
                      {icon}
                    </div>
                    <div className="mt-3 grow text-center sm:mt-0 sm:ml-4 sm:text-left">
                      {/* <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Deactivate account
                    </Dialog.Title> */}
                      {title}
                      {/* <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div> */}
                      {children}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {btn1text && (
                    <button
                      type="button"
                      className={
                        `bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500` +
                        "inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      }
                      onClick={() => {
                        (btn1handler || (() => {}))();
                        setOpen(false);
                      }}
                    >
                      {btn1text}
                    </button>
                  )}
                  {btn2text && (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        (btn2handler || (() => {}))();
                        setOpen(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      {btn2text}
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
  return <></>;
}

/* Example:
<BaseModal
  color="blue"
  icon={<></>}
  title={
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900"
    >
      Deactivate account
    </Dialog.Title>
  }
  btn1text="Confirm"
  btn2text="Cancel"
>
  <div className="mt-2">
    <p className="text-sm text-gray-500">
      Are you sure you want to deactivate your account? All of your data
      will be permanently removed. This action cannot be undone.
    </p>
  </div>
</BaseModal>
*/
