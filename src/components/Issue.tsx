import { DragEvent } from "react";
import { TIssue } from "../redux/issues/types";
import { Card } from "antd";

type TProps = {
    issue: TIssue;
    isDragged?: boolean;
    columnId: number;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>, columnId: number, issue: TIssue) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, columnId: number, issue: TIssue) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
}

const Issue: React.FC<TProps> = ({
    issue,
    columnId,
    isDragged,
    onDrop,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDragStart,
}) => {

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        onDrop(e, columnId, issue);
    }

    const handleDragStart = (e: DragEvent<HTMLDivElement>) => onDragStart(e, columnId, issue);

    const createdAt = new Date(issue.created_at);

    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdAt.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return (
        <div
            key={issue.id}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            onDrop={handleDrop}
            draggable
        >
            <Card className={`column-item `}>
                <p className="item__header">{issue.title}</p>
                <p className="item__text">#{issue.number} {issue.state === "closed" ? "closed" : `opened ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`}</p>
                <p className="item__status">{issue.user.type} | comments {issue.comments}</p>
            </Card>
        </div>
    );
}

export default Issue;
