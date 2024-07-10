import React, { useEffect, useMemo } from 'react';
import { Card } from './Card';
import { subscribe } from 'diagnostics_channel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssuesRequest, selectIssues } from '../redux/sagas/issuesSlice';

function getRandomLightColor() {
  const base = 120;
  const randomChannel = () => Math.floor(Math.random() * (256 - base) + base);
  const color = `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;
  return color;
}



const boardsData = [
  {
    title: 'To Do',
    cards: [
      { subtitle: 'Do something', text: 'Lorem ipsum i donot', appointed: 'Jany' },
      { subtitle: 'Do something', text: 'Lorem ipsum i donot', appointed: 'Jake' }
    ]
  },
  {
    title: 'In Progress',
    cards: [
      { subtitle: 'Doing something', text: 'Lorem ipsum i donot', appointed: 'Mary' },
    ]
  },
  {
    title: 'Done',
    cards: []
  }
];

export const Board = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchIssuesRequest())
  }, [])
  const boardsDataFake = useSelector(selectIssues)
  console.log(boardsDataFake)
  const boardColors = useMemo(() => boardsData.map(() => getRandomLightColor()), []);

  return (
    <div className='flex'>
      {boardsData.map((board, index) => (
        <div
          key={index + 1}
          style={{ backgroundColor: boardColors[index] }}
          className="h-fit flex-0 w-[268px]  p-5 mr-11 ml-2"
        >
          <h2 className="text-left text-white mb-3 font-bold text-xl">{board.title}</h2>
          <Card cards={board.cards} />

        </div>

      ))}

    </div>
  );
};
