"use client";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { List, Id, Card as CardType } from "../../types/kanban";
import ListContainer from "./ListContainer";
import TaskCard from "../molecules/Card";
import PlusIcon from "../atoms/PlusIcon";

// const defaultCols: List[] = [
//     {
//         id: "todo",
//         title: "Todo",
//     },
//     {
//         id: "doing",
//         title: "Work in progress",
//     },
//     {
//         id: "done",
//         title: "Done",
//     },
// ];

// const defaultTasks: Task[] = [
//     {
//         id: "1",
//         listId: "todo",
//         content: "List admin APIs for dashboard",
//     },
//     {
//         id: "2",
//         listId: "todo",
//         content:
//             "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
//     },
//     {
//         id: "3",
//         listId: "doing",
//         content: "Conduct security testing",
//     },
//     {
//         id: "4",
//         listId: "doing",
//         content: "Analyze competitors",
//     },
//     {
//         id: "5",
//         listId: "done",
//         content: "Create UI kit documentation",
//     },
//     {
//         id: "6",
//         listId: "done",
//         content: "Dev meeting",
//     },
//     {
//         id: "7",
//         listId: "done",
//         content: "Deliver dashboard prototype",
//     },
//     {
//         id: "8",
//         listId: "todo",
//         content: "Optimize application performance",
//     },
//     {
//         id: "9",
//         listId: "todo",
//         content: "Implement data validation",
//     },
//     {
//         id: "10",
//         listId: "todo",
//         content: "Design database schema",
//     },
//     {
//         id: "11",
//         listId: "todo",
//         content: "Integrate SSL web certificates into workflow",
//     },
//     {
//         id: "12",
//         listId: "doing",
//         content: "Implement error logging and monitoring",
//     },
//     {
//         id: "13",
//         listId: "doing",
//         content: "Design and implement responsive UI",
//     },
// ];

const KanbanBoard: React.FC = () => {
    const [lists, setLists] = useState<List[]>([]);

    const listId = useMemo(() => lists.map((col) => col.id), [lists]);

    const [tasks, setTasks] = useState<CardType[]>([]);

    const [activeList, setActiveList] = useState<List | null>(null);

    const [activeCard, setactiveCard] = useState<CardType | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    return (
        <section className="m-auto flex min-h-[72vh] w-full overflow-x-auto overflow-y-hidden px-[40px] py-8">
            <div>
                <DndContext
                    sensors={sensors}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <div className="flex gap-4">
                        <div className="flex gap-4 items-baseline">
                            <SortableContext items={listId}>
                                {lists.map((list) => (
                                    <ListContainer
                                        key={list.id}
                                        list={list}
                                        deleteList={deleteList}
                                        updateList={updateList}
                                        createCard={createCard}
                                        deleteCard={deleteCard}
                                        updateCard={updateCard}
                                        cards={tasks.filter(
                                            (task) => task.listId === list.id
                                        )}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                        <button
                            onClick={() => createNewList()}
                            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-secondary border-2 p-4 flex gap-2"
                        >
                            <PlusIcon />
                            Add List
                        </button>
                    </div>
                    {createPortal(
                        <DragOverlay>
                            {activeList && (
                                <ListContainer
                                    list={activeList}
                                    deleteList={deleteList}
                                    updateList={updateList}
                                    createCard={createCard}
                                    deleteCard={deleteCard}
                                    updateCard={updateCard}
                                    cards={tasks.filter(
                                        (task) => task.listId === activeList.id
                                    )}
                                />
                            )}
                            {activeCard && (
                                <TaskCard
                                    card={activeCard}
                                    deleteCard={deleteCard}
                                    updateCard={updateCard}
                                />
                            )}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
        </section>
    );
    function createCard(listId: Id) {
        const newTask: CardType = {
            id: generateId(),
            listId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    }

    function deleteCard(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function updateCard(id: Id, content: string) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }

    function createNewList() {
        const ListToAdd: List = {
            id: generateId(),
            title: `List ${lists.length + 1}`,
        };

        setLists([...lists, ListToAdd]);
    }

    function deleteList(id: Id) {
        const filteredlists = lists.filter((col) => col.id !== id);
        setLists(filteredlists);

        const newTasks = tasks.filter((t) => t.listId !== id);
        setTasks(newTasks);
    }

    function updateList(id: Id, title: string) {
        const newlists = lists.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });

        setLists(newlists);
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "List") {
            setActiveList(event.active.data.current.list);
            return;
        }

        if (event.active.data.current?.type === "Card") {
            setactiveCard(event.active.data.current.card);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveList(null);
        setactiveCard(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAList = active.data.current?.type === "List";
        if (!isActiveAList) return;

        setLists((lists) => {
            const activeListIndex = lists.findIndex(
                (col) => col.id === activeId
            );

            const overListIndex = lists.findIndex((col) => col.id === overId);

            return arrayMove(lists, activeListIndex, overListIndex);
        });
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveACard = active.data.current?.type === "Card";
        const isOverACard = over.data.current?.type === "Card";

        if (!isActiveACard) return;

        // Im dropping a Task over another Task
        if (isActiveACard && isOverACard) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].listId != tasks[overIndex].listId) {
                    // Fix introduced after video recording
                    tasks[activeIndex].listId = tasks[overIndex].listId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAList = over.data.current?.type === "List";

        // Im dropping a Task over a column
        if (isActiveACard && isOverAList) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].listId = overId;
                console.log("DROPPING TASK OVER LIST", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
};

function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
