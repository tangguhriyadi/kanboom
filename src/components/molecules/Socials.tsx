import React from "react";
import { socialData } from "../../lib/data";
import Link from "next/link";

const Socials: React.FC = () => {
    return (
        <div className="flex gap-x-6 mx-auto xl:mx-0">
            {socialData.map((social, index) => (
                <Link key={index} href={social.link} target="_blank">
                    <div className="text-[20px] hover:text-primary transition-all">
                        {social.icon}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Socials;
