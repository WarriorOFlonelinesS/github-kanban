import { useSelector } from "react-redux";
import Column from "./Column"
import { DragEvent, useEffect, useState } from "react";
import {
    getAllIssues,
    getIsLoading,
} from "../redux/issues/selectors";
import { TIssue } from "../redux/issues/types";
import { Loader } from "./Loader";

export type TColumn = {
    id: number;
    title: string;
    data: Array<TIssue>;
};

export const Board = () => {
    const [currentColumn, setCurrentColumn] = useState<number | null>(null);
    const [currentIssue, setCurrentIssue] = useState<TIssue | null>(null);
    const [columns, setColumns] = useState<Array<TColumn>>([
        { id: 1, title: 'ToDo', data: [] },
        { id: 2, title: 'In Progress', data: [] },
        { id: 3, title: 'Done', data: [] }
    ])

    const allIssues = useSelector(getAllIssues);
    const isLoading = useSelector(getIsLoading);

    useEffect(() => {
        if (!isLoading) {
            setColumns(columns.map((column, key) => ({ ...column, data: allIssues[key as 0 | 1 | 2] })))
        }
    }, [isLoading]);

    const removeTaskFromColumn = (columnId: number, taskId: number) => {
        return columns.map(column => {
            if (column.id === columnId) {
                return {
                    ...column,
                    data: column.data.filter(task => task.id !== taskId)
                };
            }
            return column;
        });
    }

    const addTaskToColumn = (columnId: number, task: TIssue, positionNumber: number) => {
        return columns.map(column => {
            if (column.id === columnId) {
                return {
                    ...column,
                    data: column.data.length
                        ? [...column.data.slice(0, positionNumber), task, ...column.data.slice(positionNumber)]
                        : [task]
                };
            }
            return column;
        });
    }

    const updateBoard = (columnIdToRemove: number, columnIdToAdd: number) => {
        console.log(columnIdToRemove, columnIdToAdd)
        const removedColumns = removeTaskFromColumn(columnIdToRemove, currentIssue?.id as number);
        const addedColumns = addTaskToColumn(columnIdToAdd, currentIssue as TIssue, 0);
        const newColumns = columns.map(column => {
            if (column.id !== columnIdToAdd || column.id !== columnIdToRemove) {
                if (column.id === columnIdToRemove) {
                    return { ...column, data: [...removedColumns.find(c => c.id === columnIdToRemove)?.data || []] };
                }
                if (column.id === columnIdToAdd) {
                    return { ...column, data: [...addedColumns.find(c => c.id === columnIdToAdd)?.data || []] };
                }
            }
            return column
        });

        setColumns(newColumns);
    }


    const dragOverHandler = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const target = e.currentTarget as HTMLDivElement;
        if (target.className === "column-item") {
            target.style.boxShadow = "0 1px 3px black";
        }
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
    }

    const handleStartDrag = (
        e: DragEvent<HTMLDivElement>,
        columnId: number,
        issue: TIssue): void => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
        setCurrentColumn(columnId)
        setCurrentIssue(issue)
    };

    const dragEndHandler = (e: DragEvent<HTMLDivElement>): void => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
        setCurrentColumn(null);
        setCurrentIssue(null);
    }

    const handleDropColumn = (e: DragEvent<HTMLDivElement>, columnId: number): void => {
        e.preventDefault();
        if (currentIssue && currentColumn && columnId) {
            updateBoard(currentColumn, columnId)
        }
    };

    const handleDropTask = (e: DragEvent<HTMLDivElement>, columnId: number, issue: TIssue): void => {
        e.preventDefault();
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
    }

    return (
        <div className="main">
            <div className="container">
                <div className={`main-content ${isLoading ? 'loaded' : ' '}`}>
                    {isLoading
                        ? < Loader />
                        : <Column
                            onDropColumn={handleDropColumn}
                            onClickStart={handleStartDrag}
                            onClickEnd={dragEndHandler}
                            onClickOver={dragOverHandler}
                            onClickLeave={dragLeaveHandler}
                            onDropTask={handleDropTask}
                            currentIssue={currentIssue}
                            columns={columns}
                        />
                    }
                </div>
            </div>
        </div>
    )
}