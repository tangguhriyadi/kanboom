export type Id = string | number;

export type List = {
    id: Id;
    title: string;
};

export type Card = {
    id: Id;
    listId: Id;
    content: string;
};
