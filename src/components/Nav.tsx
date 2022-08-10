import './Nav.module.css';

import { Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { useState } from 'react';

import { UserAuth } from '../contexts/AuthContext';
import NavItem from './NavItem';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UserAuth();
  return (
    <div>
      <nav className="fixed top-0 left-0 z-30 w-screen bg-gray-900/40 backdrop-blur-sm">
        <div className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <Link href="/">
                  <a>
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                      style={{
                        filter:
                          'hue-rotate(275deg) brightness(1.35) saturate(.8)',
                      }}
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavItem href="/">Home</NavItem>
                  <NavItem href="/about">About</NavItem>
                </div>
              </div>
            </div>
            <div className="hidden h-full md:block">
              <div className="ml-10 flex h-full flex-row items-center space-x-4 self-end">
                <a
                  className="rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-text-500 hover:shadow-xl"
                  href="https://discord.gg/szjzhYkT9e"
                >
                  Join us on Discord!
                  <i
                    className="icon-arrow-right"
                    style={{ fontFamily: 'icomoon', marginLeft: '0.5rem' }}
                  >
                    
                  </i>
                </a>
                {user?.uid ? (
                  <Link href="/profile">
                    <a className="h-full p-3">
                      <img
                        src={user.photoURL || undefined}
                        alt="Profile"
                        className="h-full rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  </Link>
                ) : (
                  <NavItem href="/signin">Sign In</NavItem>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                <NavItem href="/" mobile={true}>
                  Home
                </NavItem>
                <NavItem href="/about" mobile={true}>
                  About
                </NavItem>
                <hr className="opacity-60" />
                {user?.uid ? (
                  <Link href="/profile">
                    <a className="flex flex-row items-center justify-end p-3 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      {user.displayName}
                      <img
                        src={user.photoURL || undefined}
                        alt="Profile"
                        className="ml-4 h-12 w-12 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  </Link>
                ) : (
                  <NavItem href="/signin" mobile={true} right={true}>
                    Sign In
                  </NavItem>
                )}
                <a
                  className="block rounded-md px-3 py-2 text-right text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-xl"
                  href="https://discord.gg/szjzhYkT9e"
                >
                  Join us on Discord!
                  <i
                    className="icon-arrow-right"
                    style={{ fontFamily: 'icomoon', marginLeft: '0.5rem' }}
                  >
                    
                  </i>
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
