import { Dialog } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/outline';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import BaseModal from './BaseModal';

type ISetTimetableModalProps = {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};

function parseTimetable(timetable: string): string[] {
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong');
  }
  return [
    'abcd',
    'efgh',
    'ijkl',
    'mnop',
    'qrst',
    'uvwx',
    'yzab',
    'cdef',
    'ghij',
    'klmn',
    'opqr',
    'stuv',
  ];
}

function submitTimetable(
  e: React.FormEvent<HTMLFormElement>,
  timetable: string[]
): void {
  e.preventDefault();
  console.log(timetable);
}

export default function SetTimetableModal({
  state: modalState,
}: ISetTimetableModalProps) {
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState('');
  const [reason, setReason] = useState('');
  const [parsedTimetable, setParsedTimetable] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  useEffect(() => {
    try {
      setParsedTimetable(parseTimetable(timetable));
    } catch (error) {
      // fill timetable with question marks
      setParsedTimetable([
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
      ]);
    }
  }, [timetable]);
  return (
    <BaseModal
      state={modalState}
      color="blue"
      icon={
        <PencilAltIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
      }
      title={
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Paste your timetable:
        </Dialog.Title>
      }
      btn1text="Save"
      btn2text="Cancel"
      btn1handler={() => {
        submitTimetable({ preventDefault: () => {} }, parsedTimetable);
      }}
    >
      <div className="mt-2 w-full">
        <form
          onSubmit={(e) => {
            submitTimetable(e, parsedTimetable);
          }}
        >
          {/* Dynamically set disabled */}
          <fieldset disabled={loading}>
            <textarea
              className="min-h-[10rem] w-full overflow-hidden rounded-lg border-2 border-blue-200 p-4 text-sm text-gray-500 outline-none focus:border-[3px] focus:border-blue-500"
              value={timetable}
              onChange={(e) => setTimetable(e.target.value)}
              placeholder="Your timetable goes here"
            ></textarea>
            <p className="mt-2 text-right font-body text-xs">
              Copy your timetable from this link:{' '}
              <a
                className="text-emerald-600 underline"
                href="https://schoolzone.epsb.ca/"
              >
                https://schoolzone.epsb.ca/
              </a>
            </p>
            <div className="mt-4">
              <h3 className="mb-2 leading-6 text-gray-900">Preview</h3>
              <div className="w-full max-w-[25.5rem] overflow-x-auto p-2 text-center text-xs text-gray-900">
                <span className="w-12 bg-red-200 p-2">
                  {parsedTimetable[0]}
                </span>
                <span className="w-12 bg-orange-200 p-2">
                  {parsedTimetable[1]}
                </span>
                <span className="w-12 bg-amber-200 p-2">
                  {parsedTimetable[2]}
                </span>
                <span className="w-12 bg-yellow-200 p-2">
                  {parsedTimetable[3]}
                </span>
                <span className="w-12 bg-lime-200 p-2">
                  {parsedTimetable[4]}
                </span>
                <span className="w-12 bg-green-200 p-2">
                  {parsedTimetable[5]}
                </span>
                <span className="w-12 bg-emerald-200 p-2">
                  {parsedTimetable[6]}
                </span>
                <span className="w-12 bg-teal-200 p-2">
                  {parsedTimetable[7]}
                </span>
                <span className="w-12 bg-cyan-200 p-2">
                  {parsedTimetable[8]}
                </span>
                <span className="w-12 bg-sky-200 p-2">
                  {parsedTimetable[9]}
                </span>
                <span className="w-12 bg-blue-200 p-2">
                  {parsedTimetable[10]}
                </span>
                <span className="w-12 bg-indigo-200 p-2">
                  {parsedTimetable[11]}
                </span>
              </div>
            </div>
            <div className="mt-8 flex">
              <span className="mr-2 text-gray-900">Why&apos;d it change?</span>
              <input
                type="text"
                className="grow border-b-2 border-blue-900 bg-transparent text-sm text-gray-800 outline-none focus:border-blue-600"
                value={reason}
                placeholder="Tell us a reason"
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </BaseModal>
  );
}
