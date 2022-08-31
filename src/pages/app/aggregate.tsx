import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useAuth } from '@/contexts/AuthContext';
import { DataContext } from '@/templates/AppMain';
import compareClasses from '@/utils/compareClasses';

import Leaderboard from '../../components/Leaderboard';

export default function AppAggregate() {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  const { user } = useAuth();
  const [highestAggregate, setHighestAggregate] = useState([]);
  const [highestWithUser, setHighestWithUser] = useState([]);
  useEffect(() => {
    console.log(data);
    const players = Object.fromEntries(data.map((i) => [i.name, 0]));
    console.log(players);
    data.forEach((i) => {
      data.forEach((j) => {
        if (i.name !== j.name) {
          players[i.name] += compareClasses(i, j, true).length;
        }
      });
    });
    Object.keys(players).forEach((i) => {
      players[i] = Math.round((players[i] / (data.length - 1)) * 100) / 100;
    });
    console.log(players);
    setHighestAggregate(
      Object.entries(players)
        .sort((a, b) => b[1] - a[1])
        .map((i) => ({ name: i[0], score: i[1] }))
    );
  }, [data]);
  useEffect(() => {
    const playerName = user?.displayName;
    if (!playerName) return;
    const playerTimetable = data.find((i) => i.name === playerName);
    if (!playerTimetable) return;
    const players = Object.fromEntries(data.map((i) => [i.name, 0]));
    console.log(players);
    data.forEach((i) => {
      if (i.name === playerName) return;
      players[i.name] += compareClasses(playerTimetable, i, true).length;
    });
    console.log(players);
    setHighestWithUser(
      Object.entries(players)
        .sort((a, b) => b[1] - a[1])
        .map((i) => ({ name: i[0], score: i[1] }))
    );
  }, [data, user]);

  return (
    <>
      <div className="mt-8 h-full w-full">
        {data.length >= 5 ? (
          <>
            <Helmet>
              <style>
                {`
                  body {
                    min-height: 450px;
                    height: 100vh;
                    margin: 0;  
                    /* background: radial-gradient(ellipse farthest-corner at center top, #f39264 0%, #f2606f 100%) fixed; */
                    /* background: radial-gradient(ellipse farthest-corner at center top, #7EF364 0%, #B8F260 100%) fixed; */
                    color: #fff;
                    font-family: 'Open Sans', sans-serif;  
                  }
                `}
              </style>
            </Helmet>
            <div className="flex gap-8 overflow-auto p-8 sm:items-center sm:justify-center">
              <div>
                <Leaderboard
                  title="Highest Aggregate Scores"
                  positions={highestAggregate}
                />
              </div>
              <div>
                <Leaderboard
                  title={`Highest with ${
                    user?.displayName?.split(' ')[0] || 'You'
                  }`}
                  positions={highestWithUser}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white/90">
                Not enough data
              </h1>
              <p className="mt-4 text-xl text-white/80">
                You need at least 5 people in your group to see this page.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
