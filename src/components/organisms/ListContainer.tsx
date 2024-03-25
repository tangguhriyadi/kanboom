"use client";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { List, Id, Card as CardType } from "@/types/kanban";
import TrashIcon from "../atoms/TrashIcon";
import PlusIcon from "../atoms/PlusIcon";
import Card from "../molecules/Card";

interface ListContainerProps {
    list: List;
    deleteList: (id: Id) => void;
    updateList: (id: Id, title: string) => void;
    createCard: (columnId: Id) => void;
    updateCard: (id: Id, content: string) => void;
    deleteCard: (id: Id) => void;
    cards: CardType[];
}

const ListContainer: React.FC<ListContainerProps> = (props) => {
    const {
        list,
        createCard,
        deleteList,
        deleteCard,
        cards,
        updateList,
        updateCard,
    } = props;
    const [editMode, setEditMode] = useState(false);

    const cardIds = useMemo(() => {
        return cards.map((card) => card.id);
    }, [cards]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: list.id,
        data: {
            type: "List",
            list,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="border rounded-md border-primary"
            >
                <div className="bg-muted w-[350px] rounded-md flex flex-col opacity-0">
                    {/* Column title */}
                    <div className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold bg-muted flex items-center justify-between">
                        <div className="flex gap-2">
                            {/* <div className="flex justify-center items-center bg-muted px-2 py-1 text-sm rounded-full">
                    0
                </div> */}
                            {!editMode && list.title}
                            {editMode && (
                                <input
                                    className="bg-white focus:border-primary border rounded outline-none px-2"
                                    value={list.title}
                                />
                            )}
                        </div>
                        <button className=" stroke-gray-500 hover:stroke-primary hover:bg-muted rounded px-1 py-2">
                            <TrashIcon />
                        </button>
                    </div>

                    {/* list task container */}
                    <div className="flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                        <SortableContext items={cardIds}>
                            {cards.map((card) => (
                                <Card
                                    key={card.id}
                                    card={card}
                                    deleteCard={deleteCard}
                                    updateCard={updateCard}
                                />
                            ))}
                            <button className="flex gap-2 items-center bg-muted border-2 rounded-md p-4 border-x-primbg-muted  hover:border-primary active:bg-secondary">
                                <PlusIcon />
                                Add Card
                            </button>
                        </SortableContext>
                    </div>
                    {/* Column footer */}
                </div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-muted w-[350px] rounded-md flex flex-col"
        >
            {/* Column title */}
            <div
                {...attributes}
                {...listeners}
                onClick={() => {
                    setEditMode(true);
                }}
                className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold bg-muted flex items-center justify-between"
            >
                <div className="flex gap-2">
                    {/* <div className="flex justify-center items-center bg-muted px-2 py-1 text-sm rounded-full">
                        0
                    </div> */}
                    {!editMode && list.title}
                    {editMode && (
                        <input
                            className="bg-white focus:border-primary border rounded outline-none px-2"
                            value={list.title}
                            onChange={(e) =>
                                updateList(list.id, e.target.value)
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
                        deleteList(list.id);
                    }}
                    className=" stroke-gray-500 hover:stroke-primary hover:bg-muted rounded px-1 py-2"
                >
                    <TrashIcon />
                </button>
            </div>

            {/* list task container */}
            <div className="flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={cardIds}>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            deleteCard={deleteCard}
                            updateCard={updateCard}
                        />
                    ))}
                    <button
                        className="flex gap-2 items-center bg-muted border-2 rounded-md p-4 border-x-primbg-muted  hover:border-primary active:bg-secondary"
                        onClick={() => {
                            createCard(list.id);
                        }}
                    >
                        <PlusIcon />
                        Add Card
                    </button>
                </SortableContext>
            </div>
            {/* Column footer */}
        </div>
    );
};

export default ListContainer;
