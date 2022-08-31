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
      <Helmet>
        <style>
          {`
            body {
              min-height: 450px;
              height: 100vh;
              margin: 0;  
              background: radial-gradient(ellipse farthest-corner at center top, #f39264 0%, #f2606f 100%) fixed;
              color: #fff;
              font-family: 'Open Sans', sans-serif;  
            }
          `}
        </style>
      </Helmet>
      <div className="mt-8 h-full w-full">
        <div className="flex items-center justify-center gap-8">
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
      </div>
    </>
  );
}
