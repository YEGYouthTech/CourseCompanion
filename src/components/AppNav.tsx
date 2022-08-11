import './Nav.module.css';

import React from 'react';

import AppNavItem from './AppNavItem';

function AppNav() {
  return (
    <div>
      <nav className="fixed top-16 left-0 w-screen bg-gray-300">
        <div className="mx-auto h-16 max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="md:block">
                <div className="flex items-baseline space-x-4">
                  <AppNavItem href="/app">Home</AppNavItem>
                  <AppNavItem href="/app/classes">Classes</AppNavItem>
                  <AppNavItem href="/app/mutuals">Mutuals</AppNavItem>
                  <AppNavItem href="/app/spares">Spares</AppNavItem>
                  <AppNavItem href="/app/similarity">Matrix</AppNavItem>
                  <AppNavItem href="/app/data">Data</AppNavItem>
                  <AppNavItem href="/app/aggregate">Aggregate</AppNavItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-32"></div>
    </div>
  );
}

export default AppNav;
