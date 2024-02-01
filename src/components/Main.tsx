
import { useDispatch, useSelector } from "react-redux";
import { getIssues } from "../redux/features/actions";
import Board from "./Board"
import { DragEvent, useEffect, useState } from "react";
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
            const currentIndex =  updatedCurrentBoardItems.indexOf(currentItem);
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
    const dispatch = useAppDispatch()

    const allIssues = useSelector((state: RootState) => state.issues.allIssues)

    useEffect(() => {
        if (allIssues.length === 0) {
            dispatch(getIssues());
        }
    }, [dispatch, allIssues]);

    useEffect(() => {
        // После успешного получения данных, обновите столбец "ToDo"
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
        // После успешного получения данных, обновите столбец "In Process"
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
        // После успешного получения данных, обновите столбец "Done"
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