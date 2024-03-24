"use client";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id, Task } from "../../types/kanban";
import TrashIcon from "../atoms/TrashIcon";

interface TaskCardProps {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
    const { task, deleteTask, updateTask } = props;
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(true);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-primary  cursor-grab relative 
      "
            />
        );
    }

    if (editMode) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className=" bg-white  p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-primary cursor-grab relative"
            >
                <textarea
                    className="h-[90%] w-full resize-none border-none rounded bg-transparent focus:outline-none"
                    value={task.content}
                    autoFocus
                    placeholder="Task content here"
                    onBlur={toggleEditMode}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                            toggleEditMode();
                        }
                    }}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                />
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            className="bg-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-primary cursor-grab relative task"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                {task.content}
            </p>

            {mouseIsOver && (
                <button
                    onClick={() => {
                        deleteTask(task.id);
                    }}
                    className="stroke-gray-500 absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100 hover:stroke-primary"
                >
                    <TrashIcon />
                </button>
            )}
        </div>
    );
};

export default TaskCard;
