import { Dialog } from '@headlessui/react';
import { CogIcon } from '@heroicons/react/outline';
import type { Dispatch, SetStateAction } from 'react';

import BaseModal from './BaseModal';

type ISetTimetableModalProps = {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};

export default function SettingsModal({
  state: modalState,
}: ISetTimetableModalProps) {
  return (
    <BaseModal
      state={modalState}
      color="emerald"
      icon={<CogIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />}
      title={
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Settings
        </Dialog.Title>
      }
      btn1text="Save"
      btn2text="Cancel"
      btn1handler={() => {
        console.log('Save');
      }}
    >
      <div className="mt-2 w-full">
        <p className="font-display font-medium">Hi, idk what to put here!</p>
      </div>
    </BaseModal>
  );
}
