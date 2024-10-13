import {useTranslations} from "next-intl";
import Image from "next/image";
import React from "react";

export default function Bubbles() {
    const t = useTranslations("Members")

    const sections = [
        {
            key: '0',
            text: t(`about0`),
            href: '/images/people.avif',
            altHref: 'Our Team',
        },
        {
            key: '1',
            text: t(`about1`),
            href: '/images/board.avif',
            altHref: 'What we achieve',
        },
        {
            key: '2',
            text: t(`about2`),
            href: '/images/bullseye.avif',
            altHref: 'Goal',
        },
    ]

    return(
        <div className="flex flex-col lg:flex-row gap-5 w-[83%] mx-auto h-min justify-center py-24">
            {sections.map((section) => (
                <div
                    key={section.key}
                    className="relative flex-1 flex-col mx-auto justify-center max-w-lg bg-black bg-opacity-50 rounded-3xl p-5 gap-20"
                >
                    <div className="relative mx-auto w-[70px] h-[70px]">
                        <Image
                            src={section.href}
                            alt={section.altHref}
                            fill={true}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="w-0.5 h-5 bg-white mx-auto my-2.5"/>
                    <p className="text-justify text-base md:text-lg lg:text-base xl:text-lg basis-[100%] sm:basis-[90%]">
                        {section.text}
                    </p>
                </div>
            ))}
        </div>
    )
}