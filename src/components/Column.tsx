import { memo, useState } from "react";
import { DragEvent } from "react";
import { TCurrentColumn } from "./types";
import { TIssue } from "../redux/issues/types";
import Issue from "./Issue";
import { Card, List } from "antd";

type TProps = {
    column: TCurrentColumn;
    currentIssue: TIssue | null;
    onDropColumn: (e: DragEvent<HTMLDivElement>, columnId: number) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragStart: (
        e: DragEvent<HTMLDivElement>,
        columnId: number,
        issue: TIssue
    ) => void;
    onDropTask: (
        e: DragEvent<HTMLDivElement>,
        columnId: number,
        issue: TIssue
    ) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
    dataSource: any
}

const Column: React.FC<TProps> = ({
    dataSource,
    currentIssue,
    onDropColumn,
    onDragOver,
    onDragStart,
    onDragEnd,
    onDropTask,
    onDragLeave,
}) => {
    const [draggedOver, setDraggedOver] = useState(false);

    return (
        <div className="column">
            <List
                grid={{
                    gutter: 10,
                    xs: 1,
                }}
                dataSource={dataSource}
                renderItem={(item: TIssue) => (
                    <List.Item>
                        <Card title={item.title} onDragOver={(e) => {
                            onDragOver(e);
                            setDraggedOver(true);
                        }}
                            onDragLeave={(e) => {
                                onDragLeave(e);
                                setDraggedOver(false);
                            }}
                        >
                            <div
                                className={`column-area ${draggedOver ? "dragged-over" : ""}`}
                                onDragOver={onDragOver}
                                onDrop={(e) => onDropColumn(e, item.id)}
                            >
                                {item.data.length
                                    ? item.data.map((issue: TIssue) => (
                                        <Issue
                                            key={issue.id}
                                            isDragged={currentIssue === issue}
                                            issue={issue}
                                            columnId={item.id}
                                            onDragEnd={onDragEnd}
                                            onDrop={onDropTask}
                                            onDragStart={onDragStart}
                                            onDragOver={onDragOver}
                                            onDragLeave={onDragLeave}
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