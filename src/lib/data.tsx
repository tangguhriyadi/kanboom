import { Social } from "@/types/common";
import {
    RiAccountBoxFill,
    RiGithubFill,
    RiLinkedinFill,
    RiMediumFill,
    RiProfileFill,
    RiTelegramFill,
    RiWhatsappFill,
} from "react-icons/ri";

export const socialData: Social[] = [
    {
        link: "https://tangguhriyadi.vercel.app",
        icon: <RiAccountBoxFill />,
    },
    {
        link: "https://www.linkedin.com/in/muhammad-tangguh-riyadi-b0a36a194/",
        icon: <RiLinkedinFill />,
    },
    {
        link: "https://github.com/tangguhriyadi",
        icon: <RiGithubFill />,
    },
    {
        link: "https://medium.com/@mtangguh97",
        icon: <RiMediumFill />,
    },
    {
        link: "https://wa.me/+6282116780425",
        icon: <RiWhatsappFill />,
    },
    {
        link: "https://t.me/tangguhriyadi97",
        icon: <RiTelegramFill />,
    },
];
