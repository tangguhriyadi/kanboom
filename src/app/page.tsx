import dynamic from "next/dynamic";

const KanbanBoard = dynamic(
    () => import("@/components/organisms/KanbanBoard"),
    { ssr: false }
);

export default function Home() {
    return (
        <main className="">
            <KanbanBoard />
        </main>
    );
}
