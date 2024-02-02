
import { useSelector } from "react-redux";
import Board from "./Board"
import React, { DragEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../redux/store";

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
            const updatedCurrentBoardItems = [...currentBoard.items];
            const updatedBoardItems = [...board.items];
            const currentIndex = updatedCurrentBoardItems.indexOf(currentItem);
            if (currentIndex !== -1) {
                updatedCurrentBoardItems.splice(currentIndex, 1);
                updatedBoardItems.push(currentItem);
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
        target.style.marginBottom = '0px'
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
                const updatedCurrentBoardItems = [...currentBoard.items];
                const updatedBoardItems = [...board.items];
                updatedCurrentBoardItems.splice(currentIndex, 1);
                const dropIndex = updatedBoardItems.indexOf(item);
                updatedBoardItems.splice(dropIndex + 1, 0, currentItem);
                setBoards((prevBoards: any) =>
                    prevBoards.map((b: any) =>
                        b.id === board.id ? board : b.id === currentBoard?.id ? currentBoard : b
                    )
                );
            };
        };
    };

    const allIssues = useSelector((state: RootState) => state.issues.allIssues)
    useEffect(() => {
        setBoards(prevBoards => [
            ...prevBoards.map(b =>
                b.id === 1
                    ? { ...b, items: allIssues }
                    : b
            ),
        ]);
    }, [allIssues]);
    const openIssues = useSelector((state: RootState) => state.issues.openIssues)
    useEffect(() => {
        setBoards(prevBoards => [
            ...prevBoards.map(b =>
                b.id === 2
                    ? { ...b, items: openIssues }
                    : b
            ),
        ]);
    }, [openIssues]);
    const closedIssues = useSelector((state: RootState) => state.issues.closedIssues);

    useEffect(() => {

        setBoards(prevBoards => [
            ...prevBoards.map(b =>
                b.id === 3
                    ? { ...b, items: closedIssues }
                    : b
            ),
        ]);
    }, [closedIssues]);

    const [boards, setBoards] = useState([
        { id: 1, title: 'ToDo', items: allIssues },
        { id: 2, title: 'In Process', items: openIssues },
        { id: 3, title: 'Done', items: closedIssues }
    ])
    const option = React.useMemo(() => {
        return {
            dropCardHandler,
            dragOverHandler,
            dragStartHandler,
            dragEndHandler,
            dropHandler,
            dragLeaveHandler,
        };
    }, [dropCardHandler, dragOverHandler, dragStartHandler, dragEndHandler, dropHandler, dragLeaveHandler]);
    return (
        <div className="main">
            <div className="container">
                <div className="main-content">
                    {boards.map(board => {
                        return (
                            <Board key={board.id} options={option} board={board} currentItem={currentItem} items={board.items} dropCardHandler={function (e: DragEvent<HTMLDivElement>, board: { title: string; items?: { title: string; id: number; }[] | undefined; id: number; }): void {
                                throw new Error("Function not implemented.");
                            }} dragOverHandler={function (e: DragEvent<HTMLDivElement>): void {
                                throw new Error("Function not implemented.");
                            }} dragStartHandler={function (e: DragEvent<HTMLDivElement>, board: { title: string; items?: { title: string; id: number; }[] | undefined; id: number; }, item: { title: string; id: number; }): void {
                                throw new Error("Function not implemented.");
                            }} dragEndHandler={function (e: DragEvent<HTMLDivElement>): void {
                                throw new Error("Function not implemented.");
                            }} dropHandler={function (e: DragEvent<HTMLDivElement>, board: { title: string; items?: { title: string; id: number; }[] | undefined; id: number; }, item: { title: string; id: number; }): void {
                                throw new Error("Function not implemented.");
                            }} dragLeaveHandler={function (e: DragEvent<HTMLDivElement>): void {
                                throw new Error("Function not implemented.");
                            }} />
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}