import { useSelector } from "react-redux";
import Column from "./Column"
import { DragEvent, useEffect, useState } from "react";
import {
    getAllIssues,
    getIsLoading,
} from "../redux/issues/selectors";
import { TIssue } from "../redux/issues/types";
import { Spin } from "antd";

type TColumn = {
    id: number;
    title: string;
    data: Array<TIssue>;
};

export const Board = () => {
    const [currentColumn, setCurrentColumn] = useState<number | null>(null);
    const [currentIssue, setCurrentIssue] = useState<TIssue | null>(null);

    const isLoading = useSelector(getIsLoading);
    const allIssues = useSelector(getAllIssues);

    const [columns, setColumns] = useState<Array<TColumn>>([
        { id: 1, title: 'ToDo', data: [] },
        { id: 2, title: 'In Progress', data: [] },
        { id: 3, title: 'Done', data: [] }
    ])

    useEffect(() => {
        if (!isLoading) {
            setColumns(columns.map((column, key) => ({ ...column, data: allIssues[key as 0 | 1 | 2] })))
        }
    }, [isLoading]);

    const updateDataInColumn = (columnId: number, newData: Array<TIssue>) => {
        console.log({ columnId, newData })
        setColumns(columns.map(column => column.id === columnId
            ? { ...column, data: newData as Array<TIssue> }
            : column
        ))
    }

    const removeTaskFromColumn = (columnId: number, taskId: number) => {
        const column = columns.find(column => column.id === columnId)
        if (column) {
            const newData = column.data.filter(task => task.id !== taskId)
            updateDataInColumn(columnId, newData)
        }
    }

    const addTaskToColumn = (columnId: number, task: TIssue, positionNumber: number) => {
        const column = columns.find(column => column.id === columnId)
        if (column) {
            const newData = column.data.length
                ? [...column.data.slice(0, positionNumber), task, ...column.data.slice(positionNumber)]
                : [task]
            updateDataInColumn(columnId, newData)
        }
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
        console.log('dragStartHandler', columnId, issue)
        setCurrentColumn(columnId)
        setCurrentIssue(issue)
    };

    const dragEndHandler = (e: DragEvent<HTMLDivElement>): void => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
        console.log('dragEndHandler')
        setCurrentColumn(null);
        setCurrentIssue(null);
    }

    const handleDropColumn = (e: DragEvent<HTMLDivElement>, columnId: number): void => {
        console.log('handleDropColumn', columnId, currentIssue, currentColumn)
        e.preventDefault();
        if (currentIssue && currentColumn && columnId) {
            removeTaskFromColumn(currentColumn, currentIssue.id);
            addTaskToColumn(columnId, currentIssue, 0);
        };
    };

    const handleDropTask = ( 
        e: DragEvent<HTMLDivElement>,
        columnId: number,
        issue: TIssue): void => {
        e.preventDefault();
        console.log('handleDropTask', columnId, issue)
        const target = e.currentTarget as HTMLDivElement;
        target.style.boxShadow = "none";
    }


    return (
        <div className="main">
            <div className="container">
                <div className="main-content">
                    {isLoading
                        ? <div className="loader">
                            <Spin tip="Issues are loading" size="large">
                                <div className="content" />
                            </Spin>
                        </div>
                        :
                        <Column
                            onDropColumn={handleDropColumn}
                            onDragStart={handleStartDrag}
                            onDragEnd={dragEndHandler}
                            onDragOver={dragOverHandler}
                            onDragLeave={dragLeaveHandler}
                            onDropTask={handleDropTask}
                            currentIssue={currentIssue}
                            dataSource={columns} 
                            column={{
                                title: "",
                                data: [],
                                id: 0
                            }}                        
                        />
                    }
                </div>
            </div>
        </div>
    )
}