import { Dialog } from '@headlessui/react';
import PDFJS from 'pdfjs-dist';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  HiCheckCircle as CheckCircleIcon,
  HiOutlinePencilAlt as PencilAltIcon,
  HiXCircle as XCircleIcon,
} from 'react-icons/hi';

import auth from '@/lib/firebase';
import { parseTimetable } from '@/lib/parseTimetable';

import BaseModal from '../BaseModal';
import { Blocks } from '../vis/Blocks';

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
  if (!auth.currentUser) {
    throw new Error('Not logged in');
  }
  console.log('saveTimetable', timetable);
  const request = await fetch(`/api/users/${auth.currentUser.uid}`, {
    method: 'PUT',
    body: JSON.stringify({ timetable }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${await auth.currentUser.getIdToken()}`,
    },
  });
  let json;
  try {
    json = await request.json();
  } catch (error) {
    // if (request.status !== 200) {
    //   throw new Error(
    //     `Received error HTTP status code ${request.status} ${request.statusText}`
    //   );
    // }
    throw new Error(error);
  }
  if (!request.ok || json?.error !== undefined) {
    throw new Error(json?.error || 'Unknown error');
  }
}

function submitTimetable(timetable): void {
  console.log('submitTimetable', timetable);
  toast.promise(saveTimetable(timetable), {
    loading: 'Saving timetable...',
    success: (
      <b>{`Your timetable has been ${
        timetable?.blocks?.length ? 'updated' : 'deleted from our database'
      }!`}</b>
    ),
    error: (error: Error) => <b>Error: {error.message}</b>,
  });
}

export default function SetTimetableModal({
  state: modalState,
}: ISetTimetableModalProps) {
  const [timetableString, setTimetableString] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState({
    success: false,
    reason: 'No changes made.',
  });
  const [parsedTimetable, setParsedTimetable] = useState({});
  const fileInputRef = useRef(null);
  useEffect(() => {
    try {
      const timetable = parseTimetable(timetableString);
      setParsedTimetable(timetable);
    } catch (error) {
      console.log(error);
      setStatus({
        success: false,
        reason: error?.message,
      });
      setParsedTimetable({});
      return;
    }
    setStatus({
      success: true,
      reason: "Everything lookin' good!",
    });
  }, [timetableString]);
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
        submitTimetable(parsedTimetable);
      }}
    >
      <div className="mt-2 w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p className="mb-2 font-body">
            Open this link and sign in. If it doesn't take you to the timetable PDF directly, click it again. Copy your timetable from this link and only this link:{' '}
            <a class="inline-block max-w-[30ch] truncate align-middle text-emerald-600 underline" href="https://schoolzone.epsb.ca/cf/profile/Timetable/printPdf.cfm?timetableDate=9,01,23&amp;daylist=false" target="_blank" rel="noreferrer">https://schoolzone.epsb.ca/cf/profile/Timetable/printPdf.cfm?timetableDate=9,01,23&amp;daylist=false</a>
          </p>
          <textarea
            className="min-h-[10rem] w-full rounded-lg border-2 border-blue-200 p-4 text-sm text-gray-500 outline-none focus:border-[3px] focus:border-blue-500"
            value={timetableString}
            onChange={(e) => setTimetableString(e.target.value)}
            placeholder="Your timetable goes here"
          ></textarea>
          <p className="mt-2 text-right font-body text-xs">
            Copy your timetable from this link:{' '}
            <a
              className="inline-block max-w-[15ch] truncate align-middle text-emerald-600 underline"
              href="https://schoolzone.epsb.ca/cf/profile/Timetable/printPdf.cfm?timetableDate=9,01,23&daylist=false"
              target="_blank"
              rel="noreferrer"
            >
              https://schoolzone.epsb.ca/cf/profile/Timetable/printPdf.cfm?timetableDate=9,01,23&daylist=false
            </a>
          </p>
          <div>
            <p className="text-sm">
              Alternatively, just upload the PDF you downloaded:
            </p>
            <div className="flex items-center">
              <input type="file" ref={fileInputRef} className="w-80" />
              <span className="grow"></span>
              <button
                className="mt-2 rounded-lg bg-blue-500 px-4 py-2 font-body text-sm text-white"
                onClick={function () {
                  const file = fileInputRef.current.files[0];
                  const reader = new FileReader();
                  reader.onload = async function (e) {
                    const data = new Uint8Array(e.target.result);
                    const pdf = await PDFJS.getDocument(data);
                    let text = '';
                    console.log(pdf);
                    for (let i = 1; i <= pdf.numPages; i++) {
                      console.log(i);
                      const page = await pdf.getPage(i);
                      const textContent = await page.getTextContent();
                      console.log(textContent);
                      const str = textContent.items
                        .map(function (s) {
                          if (s.str === ' ') {
                            return '\n';
                          }
                          if (s.transform[4] < 30) {
                            return `\n${s.str}`;
                          }
                          return s.str;
                        })
                        .join(' ');
                      text += str;
                    }
                    console.log(text);
                    setTimetableString(
                      text
                        .replace(/ +/g, ' ')
                        .replace(/\n +/g, '\n')
                        .replace(/ +\n/g, '\n')
                        .replace(/\n+/g, '\n')
                        .trim()
                    );
                  };
                  reader.readAsArrayBuffer(file);
                }}
              >
                Convert
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 leading-6 text-gray-900">Preview</h3>

            <div className="-mt-20 w-full max-w-[25.5rem] overflow-x-auto  whitespace-nowrap px-6 pt-20 text-center text-xs text-gray-900">
              {parsedTimetable?.blocks?.length ? (
                <Blocks blocks={parsedTimetable?.blocks} />
              ) : (
                ''
              )}
            </div>
            <div
              className={`mt-3 inline-flex w-full items-center rounded-lg ${
                status.success
                  ? 'bg-green-100 text-base text-green-700'
                  : 'bg-red-100 text-xs text-red-700'
              } py-5 px-6`}
              role="alert"
            >
              {status.success ? (
                <CheckCircleIcon className="mr-2 h-4 min-w-[1rem] fill-current" />
              ) : (
                <XCircleIcon className="mr-2 h-4 min-w-[1rem] fill-current" />
              )}
              <span>
                {!status.success && (
                  <>
                    Oops! We couldn&apos;t parse your timetable. This usually
                    happens because you didn&apos;t copy the entire timetable or
                    use the link we provided. If you need help, please join our
                    Discord server!{' '}
                    <a
                      href="https://discord.gg/szjzhYkT9e"
                      className="underline"
                    >
                      https://discord.gg/szjzhYkT9e
                    </a>
                    <br />
                    <br />
                    Technical details:
                    <br />
                  </>
                )}
                {status.reason}
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
        </form>
      </div>
    </BaseModal>
  );
}
