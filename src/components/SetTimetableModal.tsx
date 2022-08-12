import { Dialog } from '@headlessui/react';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  HiCheckCircle as CheckCircleIcon,
  HiOutlinePencilAlt as PencilAltIcon,
  HiXCircle as XCircleIcon,
} from 'react-icons/hi';

import { parseTimetable } from '@/lib/parseTimetable';

import BaseModal from './BaseModal';
import { Blocks } from './vis/Blocks.jsx';

type ISetTimetableModalProps = {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};

function parseTimetable_TEST(timetable: string): string[] {
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

async function saveTimetable(timetable: string[]): Promise<void> {
  // TODO: implement
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong');
  }
}

function submitTimetable(
  e: React.FormEvent<HTMLFormElement>,
  timetable: string[]
): void {
  e.preventDefault();
  console.log('submitTimetable', timetable);
  toast.promise(saveTimetable(timetable), {
    loading: 'Saving timetable...',
    success: <b>Timetable saved</b>,
    error: <b>Error saving timetable</b>,
  });
}

export default function SetTimetableModal({
  state: modalState,
}: ISetTimetableModalProps) {
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState({
    success: false,
    reason: 'No changes made.',
  });
  const [parsedTimetable, setParsedTimetable] = useState([]);
  useEffect(() => {
    try {
      const { blocks } = parseTimetable(timetable);
      setParsedTimetable(blocks);
    } catch (error) {
      console.log(error);
      setStatus({
        success: false,
        reason: error?.message,
      });
      setParsedTimetable([]);
      return;
    }
    setStatus({
      success: true,
      reason: "Everything lookin' good!",
    });
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
              className="min-h-[10rem] w-full rounded-lg border-2 border-blue-200 p-4 text-sm text-gray-500 outline-none focus:border-[3px] focus:border-blue-500"
              value={timetable}
              onChange={(e) => setTimetable(e.target.value)}
              placeholder="Your timetable goes here"
            ></textarea>
            <p className="mt-2 text-right font-body text-xs">
              Copy your timetable from this link:{' '}
              <a
                className="inline-block max-w-[15ch] truncate align-middle text-emerald-600 underline"
                href="https://schoolzone.epsb.ca/cf/profile/Timetable/printPdf.cfm?timetableDate=10,01,22&daylist=false"
              >
                https://schoolzone.epsb.ca/cf/profile/Timetable/printPdf.cfm?timetableDate=10,01,22&daylist=false
              </a>
            </p>
            <div className="mt-4">
              <h3 className="mb-2 leading-6 text-gray-900">Preview</h3>

              <div className="w-full max-w-[25.5rem] overflow-x-auto whitespace-nowrap text-center text-xs text-gray-900">
                {parsedTimetable.length ? (
                  <Blocks blocks={parsedTimetable} />
                ) : (
                  ''
                )}
              </div>
              <div
                className={`mt-3 inline-flex w-full items-center rounded-lg ${
                  status.success ? 'bg-green-100' : 'bg-red-100'
                } py-5 px-6 text-base ${
                  status.success ? 'text-green-700' : 'text-red-700'
                }`}
                role="alert"
              >
                {status.success ? (
                  <CheckCircleIcon className="mr-2 h-4 min-w-[1rem] fill-current" />
                ) : (
                  <XCircleIcon className="mr-2 h-4 min-w-[1rem] fill-current" />
                )}
                <span>{status.reason}</span>
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
