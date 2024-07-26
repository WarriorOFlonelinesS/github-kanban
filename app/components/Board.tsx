import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssuesRequest, selectIssues, selectIsLoading } from '../redux/sagas/issuesSlice';
import { TIssue } from '../redux/types';

function getRandomLightColor() {
  const base = 120;
  const randomChannel = () => Math.floor(Math.random() * (256 - base) + base);
  const color = `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;
  return color;
}

interface TColumn {
  id: number;
  title: string;
  data: TIssue[];
}

const dragHandlers = {
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.className === 'bg-white mb-4 p-2 shadow-lg shadow-slate-400 cursor-pointer') {
      target.style.boxShadow = '0px 4px 3px gray';
      console.log(target.className);
    }
  },
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = 'none';
  },
  dragStartHandler: (e: React.DragEvent<HTMLDivElement>, setCurentItem: React.Dispatch<React.SetStateAction<any>>, setCurentBoard: React.Dispatch<React.SetStateAction<any>>, column: TColumn, item: TIssue) => {
    setCurentItem(item);
    setCurentBoard(column);
  },
  dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = 'none';
  },
  dropHandler: (e: React.DragEvent<HTMLDivElement>, curentItem: TIssue | null, curentBoard: TColumn | null, columns: TColumn[], setColumns: React.Dispatch<React.SetStateAction<TColumn[]>>, column: TColumn) => {
    if (curentItem && curentBoard && curentBoard.id !== column.id) {

      const curentBoardCopy = { ...curentBoard, data: [...curentBoard.data] };
      const columnCopy = { ...column, data: [...column.data] };


      const currentIndex = curentBoardCopy.data.indexOf(curentItem);
      curentBoardCopy.data.splice(currentIndex, 1);


      columnCopy.data.push(curentItem);

      setColumns(
        columns.map(col => {
          if (col.id === columnCopy.id) {
            return columnCopy;
          }
          if (col.id === curentBoardCopy.id) {
            return curentBoardCopy;
          }
          return col;
        })
      );
    }
  }
};

export const Board = () => {
  const [curentItem, setCurentItem] = useState<TIssue | null>(null);
  const [curentBoard, setCurentBoard] = useState<TColumn | null>(null);
  const [columns, setColumns] = useState<TColumn[]>([
    { id: 1, title: 'ToDo', data: [] },
    { id: 2, title: 'In Progress', data: [] },
    { id: 3, title: 'Done', data: [] },
  ]);

  const [boardColors] = useState(() => columns.map(() => getRandomLightColor()));

  const allIssues = useSelector(selectIssues);

  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIssuesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && allIssues) {
      setColumns(columns.map((column, index) => ({ ...column, data: allIssues[index] })));
    }
  }, [isLoading, allIssues]);

  return (
    <div className="flex h-full">
      {columns.map((column, index) => (
        <div
          key={column.id}
          style={{ backgroundColor: boardColors[index] }}
          className="flex-1 p-5 mr-11 ml-2 flex flex-col"
          onDragOver={dragHandlers.dragOverHandler}
          onDrop={(e) => dragHandlers.dropHandler(e, curentItem, curentBoard, columns, setColumns, column)}
        >
          <h2 className="text-left text-white mb-3 font-bold text-xl">{column.title}</h2>
          <div className="flex-1">
            <Card
              cards={column.data}
              dragHandlers={dragHandlers}
              setCurentItem={setCurentItem}
              setCurentBoard={setCurentBoard}
              column={column}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
