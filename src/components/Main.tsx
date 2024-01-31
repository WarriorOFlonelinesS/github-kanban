import Board from "./Board"
import { DragEvent, useState } from "react";

type TItem = {
    title: string;
    id: number;
};

type TBoard = {
    title: string;
    items?: TItem[];
    id: number;
};

export default function Main() {
    const [currentBoard, setCurrentBoard] = useState<TBoard | null>(null);
    const [currentItem, setCurrentItem] = useState<TItem | null>(null);

    function dropCardHandler(e: DragEvent<HTMLDivElement>, board: TBoard): void {
        e.preventDefault();
        if (currentItem && currentBoard?.items && board.items) {
            const currentIndex = currentBoard.items.indexOf(currentItem);
            if (currentIndex !== -1) {
                currentBoard.items.splice(currentIndex, 1);
                board.items.push(currentItem);
            }
        };
    };
    function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        const target = e.currentTarget as HTMLDivElement;

        if (target.className === "column-item") {
            target.style.boxShadow = "0 1px 3px black";
        }
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
    }

    function dragStartHandler(
        e: DragEvent<HTMLDivElement>,
        board: TBoard,
        item: TItem
    ): void {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
        setCurrentBoard(board)
        setCurrentItem(item)
    };

    function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
        console.log("Drag ended");
        setCurrentBoard(null);
        setCurrentItem(null);
    }

    function dropHandler(
        e: DragEvent<HTMLDivElement>,
        board: TBoard,
        item: TItem
    ): void {
        e.preventDefault();
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
        if (currentItem && currentBoard?.items && board.items) {
            const currentIndex = currentBoard.items.indexOf(currentItem);
            if (currentIndex !== -1) {
                currentBoard.items.splice(currentIndex, 1);
                const dropIndex = board.items.indexOf(item);
                board.items.splice(dropIndex + 1, 0, currentItem);
                setBoards((prevBoards: any) =>
                    prevBoards.map((b: any) =>
                        b.id === board.id ? board : b.id === currentBoard?.id ? currentBoard : b
                    )
                );
            };
        };
    };
    const [boards, setBoards] = useState([
        { id: 1, title: 'ToDo', items: [{ id: 1, title: 'doing something' }, { id: 2, title: 'go eat' }] },
        { id: 2, title: 'In Process', items: [{ id: 3, title: 'working with cat' }, { id: 4, title: 'playing with cat' }] },
        { id: 3, title: 'Done', items: [{ id: 5, title: 'I have done this' }] }
    ])
    const option = {
        dropCardHandler: dropCardHandler,
        dragOverHandler: dragOverHandler,
        dragStartHandler: dragStartHandler,
        dragEndHandler: dragEndHandler,
        dropHandler: dropHandler,
        dragLeaveHandler: dragLeaveHandler,
    }
    return (
        <div className="main">
            <div className="container">
                <div className="main-content">
                    {boards.map(board => {
                        return (
                            <Board key={board.id} items={board.items} options={option} board={board} currentItem={currentItem} />
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}