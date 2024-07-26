import React from 'react';

interface CardProp {
  title: string;
  text: string;
  appointed: string;
}

type CardProps = {
  cards: CardProp[];
  dragHandlers: {
    dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    dragStartHandler: (
      e: React.DragEvent<HTMLDivElement>,
      setCurentItem: React.Dispatch<React.SetStateAction<any>>,
      setCurentBoard: React.Dispatch<React.SetStateAction<any>>,
      column: any,
      item: any
    ) => void;
    dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    dropHandler: (
      e: React.DragEvent<HTMLDivElement>,
      curentItem: any,
      curentBoard: any,
      columns: any[],
      setColumns: React.Dispatch<React.SetStateAction<any>>,
      column: any
    ) => void;
  };
  setCurentItem: React.Dispatch<React.SetStateAction<any>>;
  setCurentBoard: React.Dispatch<React.SetStateAction<any>>;
  column: any;
};

export const Card: React.FC<CardProps> = ({ cards, dragHandlers, setCurentItem, setCurentBoard, column }) => {
  return (
    <>
      {cards.map((card, index) => (
        <div
          draggable={true}
          key={index}
          onDragStart={(e) => dragHandlers.dragStartHandler(e, setCurentItem, setCurentBoard, column, card)}
          onDragLeave={dragHandlers.dragLeaveHandler}
          onDragEnd={dragHandlers.dragEndHandler}
          onDragOver={dragHandlers.dragOverHandler}
          onDrop={(e) => dragHandlers.dropHandler(e, card, column, [], () => {}, column)}
          className="bg-white mb-4 p-2 shadow-lg shadow-slate-400 cursor-pointer"
        >
          <h2>{card.title}</h2>
          <div className="flex items-center mt-3">
            <div className="w-8 h-8 bg-slate-400 rounded-3xl mr-2" />
            <p className="text-sm">{card.appointed}</p>
          </div>
        </div>
      ))}
    </>
  );
};
