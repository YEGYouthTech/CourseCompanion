import './Nav.module.css';

import React from 'react';

import AppNavItem from './AppNavItem';

function AppNav() {
  return (
    <>
      <nav className="nav AppTopControlBar fixed top-16 left-0 z-10 w-screen">
        <div className="mx-auto h-16 max-w-7xl overflow-x-auto overflow-y-hidden px-4 sm:px-6 lg:px-8">
          <div className="AppTopControlBarChild flex h-16 items-center justify-between backdrop-blur-sm">
            <div className="flex items-center">
              <div className="md:block">
                <div className="flex items-baseline space-x-4">
                  <AppNavItem href="/app">Home</AppNavItem>
                  <AppNavItem href="/app/classes">Classes</AppNavItem>
                  <AppNavItem href="/app/mutuals">Mutuals</AppNavItem>
                  {/* <AppNavItem href="/app/spares">Spares</AppNavItem> */}
                  <AppNavItem href="/app/similarity">Matrix</AppNavItem>
                  <AppNavItem href="/app/data">Data</AppNavItem>
                  <AppNavItem href="/app/table">Table</AppNavItem>
                  <AppNavItem href="/app/aggregate">Aggregate</AppNavItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-36"></div>
    </>
  );
}

export default AppNav;
