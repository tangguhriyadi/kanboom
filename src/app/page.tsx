import dynamic from "next/dynamic";
import KanbanLoading from "../components/molecules/KanbanLoading";

const KanbanBoard = dynamic(
    () => import("@/components/organisms/KanbanBoard"),
    { ssr: false, loading: () => <KanbanLoading /> }
);

export default function Home() {
    return (
        <main className="">
            <KanbanBoard />
        </main>
    );
}
