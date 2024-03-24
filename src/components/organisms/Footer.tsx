import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "../molecules/Socials";

const Footer: React.FC = (props) => {
    return (
        <footer className="w-full flex flex-col justify-center items-center gap-y-1">
            <div className="flex justify-center">
                <Image
                    src="/kb-footer.png"
                    alt="KanBoom"
                    height={48}
                    width={161}
                    priority
                />
            </div>
            <div className="text-muted-foreground">
                Copyright &copy;{" "}
                <Link
                    href="https://tangguhriyadi.vercel.app"
                    target="_blank"
                    className="hover:text-primary cursor-pointer"
                >
                    Muhammad Tangguh Riyadi.
                </Link>{" "}
                All rights reserved.
            </div>
            <Socials />
        </footer>
    );
};

export default Footer;
