"use client";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
// import TrashIcon from "../icons/TrashIcon";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { Column, Id, Task } from "../../types/kanban";
import TrashIcon from "../atoms/TrashIcon";
import PlusIcon from "../atoms/PlusIcon";
import TaskCard from "../molecules/TaskCard";
// import PlusIcon from "../icons/PlusIcon";
// import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;

    createTask: (columnId: Id) => void;
    updateTask: (id: Id, content: string) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];
}

function ColumnContainer({
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
}: Props) {
    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
      bg-muted
      opacity-40
      border-2
      border-pink-500
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
  bg-muted
  w-[350px]
  h-[500px]
  max-h-[500px]
  rounded-md
  flex
  flex-col
  "
        >
            {/* Column title */}
            <div
                {...attributes}
                {...listeners}
                onClick={() => {
                    setEditMode(true);
                }}
                className="
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      bg-muted
      flex
      items-center
      justify-between
      "
            >
                <div className="flex gap-2">
                    <div
                        className="
        flex
        justify-center
        items-center
        bg-muted
        px-2
        py-1
        text-sm
        rounded-full
        "
                    >
                        0
                    </div>
                    {!editMode && column.title}
                    {editMode && (
                        <input
                            className="bg-white focus:border-primary border rounded outline-none px-2"
                            value={column.title}
                            onChange={(e) =>
                                updateColumn(column.id, e.target.value)
                            }
                            autoFocus
                            onBlur={() => {
                                setEditMode(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => {
                        deleteColumn(column.id);
                    }}
                    className="
        stroke-gray-500
        hover:stroke-primary
        hover:bg-muted
        rounded
        px-1
        py-2
        "
                >
                    <TrashIcon />
                </button>
            </div>

            {/* Column task container */}
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </div>
            {/* Column footer */}
            <button
                className="flex gap-2 items-center border-primbg-muted border-2 rounded-md p-4 border-x-primbg-muted hover:bg-mainBackgroundColor hover:text-primary active:bg-secondary"
                onClick={() => {
                    createTask(column.id);
                }}
            >
                <PlusIcon />
                Add task
            </button>
        </div>
    );
}

export default ColumnContainer;
