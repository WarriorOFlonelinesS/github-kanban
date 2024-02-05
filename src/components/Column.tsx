import { memo, useState } from "react";
import { DragEvent } from "react";
import { TIssue } from "../redux/issues/types";
import Issue from "./Issue";
import { Card, List } from "antd";
import { TCurrentColumn } from "./types";

type TProps = {
    currentIssue: TIssue | null;
    onDropColumn: (e: DragEvent<HTMLDivElement>, columnId: number) => void;
    onClickOver: (e: DragEvent<HTMLDivElement>) => void;
    onClickStart: (
        e: DragEvent<HTMLDivElement>,
        columnId: number,
        issue: TIssue
    ) => void;
    onDropTask: (
        e: DragEvent<HTMLDivElement>,
        columnId: number,
        issue: TIssue
    ) => void;
    onClickLeave: (e: DragEvent<HTMLDivElement>) => void;
    onClickEnd: (e: DragEvent<HTMLDivElement>) => void;
    columns: TCurrentColumn[];
}

const Column: React.FC<TProps> = ({
    columns,
    currentIssue,
    onDropColumn,
    onClickOver,
    onClickStart,
    onClickEnd,
    onDropTask,
    onClickLeave,
}) => {
    const [draggedOver, setDraggedOver] = useState(false);

    return (
        <div className="column">
            <List
                grid={{
                    gutter: 10,
                    sm: 1
                }}
                dataSource={columns}
                renderItem={(column:  TCurrentColumn) => (
                    <List.Item>
                        <Card
                            title={`${column.title} (${column.data.length})`}
                            onDragOver={(e) => {
                                onClickOver(e);
                                setDraggedOver(true);
                            }}
                            onDragLeave={(e) => {
                                onClickLeave(e);
                                setDraggedOver(false);
                            }}
                        >
                            <div
                                className={`column-area ${draggedOver ? "dragged-over" : ""}`}
                                onDragOver={onClickOver}
                                onDrop={(e) => onDropColumn(e, column.id)}
                            >
                                {column.data.length
                                    ? column.data.map((issue: TIssue) => (
                                        <Issue
                                            key={issue.id}
                                            isDragged={currentIssue === issue}
                                            issue={issue}
                                            columnId={column.id}
                                            onDragEnd={onClickEnd}
                                            onDrop={onDropTask}
                                            onDragStart={onClickStart}
                                            onDragOver={onClickOver}
                                            onDragLeave={onClickLeave}
                                        />
                                    ))
                                    : <div className="column__empty">No items</div>
                                }
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}


export default memo(Column);