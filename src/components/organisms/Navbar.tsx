import Image from "next/image";
import React from "react";

const Navbar: React.FC = (props) => {
    return (
        <nav className="w-full bg-primary py-8 px-6">
            <Image
                src="/kb-navbar.png"
                alt="KanBoom"
                height={48}
                width={161}
                priority
            />
        </nav>
    );
};

export default Navbar;
