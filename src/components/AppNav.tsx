import './Nav.module.css';

import React from 'react';

import AppNavItem from './AppNavItem';

function AppNav() {
  return (
    <>
      <nav className="nav AppTopControlBar fixed left-0 top-16 z-10 w-screen">
        <div className="mx-auto h-16 max-w-7xl overflow-x-auto overflow-y-hidden px-4 sm:px-6 lg:px-8">
          <div className="AppTopControlBarChild flex h-16 items-center justify-between backdrop-blur-sm">
            <div className="flex items-center">
              <div className="md:block">
                <div className="flex items-baseline space-x-4">
                  <AppNavItem href="/app">Home</AppNavItem>
                  <AppNavItem href="/app/classes">Classes</AppNavItem>
                  <AppNavItem href="/app/mutuals">Mutuals</AppNavItem>
                  <AppNavItem href="/app/similarity">Matrix</AppNavItem>
                  <AppNavItem href="/app/data">Data</AppNavItem>
                  <AppNavItem href="/app/table">Table</AppNavItem>
                  <AppNavItem href="/app/aggregate">Aggregate</AppNavItem>
                  <AppNavItem href="/app/spares">Spares</AppNavItem>
                  <AppNavItem href="/app/timetable">Timetable</AppNavItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-[4rem]"></div>
      <div className="mt-4"></div>
    </>
  );
}

export default AppNav;
