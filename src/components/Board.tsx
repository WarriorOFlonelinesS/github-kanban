
import { memo, useEffect, useState } from "react";
import { DragEvent } from "react";


type TItem = {
    title: string;
    id: number;
};

type TBoard = {
    title: string;
    items?: TItem[];
    id: number;
};

interface IOptions {
    dropCardHandler: (e: DragEvent<HTMLDivElement>, board: TBoard) => void;
    dragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
    dragStartHandler: (
        e: DragEvent<HTMLDivElement>,
        board: TBoard,
        item: TItem,
    ) => void;
    dragEndHandler: (e: DragEvent<HTMLDivElement>) => void;
    dropHandler: (
        e: DragEvent<HTMLDivElement>,
        board: TBoard,
        item: TItem
    ) => void;
    dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void;
}

interface IProps {
    items?: TItem[];
    options: IOptions;
    board: TBoard;
    currentItem: TItem | null;
}


const Board: React.FC<IProps & IOptions> = ({ items, options, board, currentItem }) => {
    const [draggedOver, setDraggedOver] = useState(false);
    const {
        dropCardHandler,
        dragOverHandler,
        dragStartHandler,
        dragEndHandler,
        dropHandler,
        dragLeaveHandler,
    } = options;

    return (
        <div className="column"
            onDragOver={(e) => {
                dragOverHandler(e);
                setDraggedOver(true);
            }}
            onDragLeave={(e) => {
                dragLeaveHandler(e);
                setDraggedOver(false);
            }}
            onDrop={(e) => {

                setDraggedOver(false);
            }}
        >
            <p className="column__title">{board.title}</p>
            <div
                className={`column-area ${draggedOver ? "dragged-over" : ""}`}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandler(e, board)}
            >
                {items?.map((item) => {
                    return (
                        <div
                            className={`column-item ${currentItem === item ? "dragged" : ""}`}
                            key={item.id}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => {
                                dropHandler(e, board, item);
                                setDraggedOver(false);
                            }}
                            draggable={true}
                        >
                            <p className="item__header">{item.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default memo(Board);
