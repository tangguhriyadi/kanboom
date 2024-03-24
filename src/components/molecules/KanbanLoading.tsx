import React from "react";
import Skeleton from "react-loading-skeleton";

const KanbanLoading: React.FC = () => {
    return (
        <div className="min-h-[72vh] w-full px-[40px] py-8 flex gap-x-4">
            <Skeleton className="w-[350px] h-[500px] rounded-md" />
            <Skeleton className="h-[60px] w-[350px] rounded-md" />
        </div>
    );
};

export default KanbanLoading;
