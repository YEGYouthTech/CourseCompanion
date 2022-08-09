import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import './nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="fixed top-0 left-0 z-30 w-screen bg-gray-900 bg-opacity-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
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
                  <NavItem href="/contact">Contact</NavItem>
                  <NavItem href="/blog">Blog</NavItem>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 self-end">
                <a
                  className="text-text-500 bg-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:shadow-xl"
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
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavItem href="/" mobile={true}>
                  Home
                </NavItem>
                <NavItem href="/about" mobile={true}>
                  About
                </NavItem>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

function NavItem({ href, children, mobile }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`${
          router.pathname === href
            ? 'hover:bg-gray-700 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } ${
          !mobile
            ? 'px-3 py-2 rounded-md text-sm font-medium'
            : 'block px-3 py-2 rounded-md text-base font-medium'
        }`}
      >
        {children}
      </a>
    </Link>
  );
}

export default Nav;
