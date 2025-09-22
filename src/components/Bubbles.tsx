import {useTranslations} from "next-intl";
import React from "react";
import {PeopleSvg} from "~/components/svg-components/PeopleSvg";
import {TasksSvg} from "~/components/svg-components/TasksSvg";
import {GoalSvg} from "~/components/svg-components/GoalSvg";

export default function Bubbles() {
    const t = useTranslations("Members")

    const sections = [
        {
            key: '0',
            text: t(`about0`),
            image: PeopleSvg,
            altHref: 'Our Team',
        },
        {
            key: '1',
            text: t(`about1`),
            image: TasksSvg,
            altHref: 'What we achieve',
        },
        {
            key: '2',
            text: t(`about2`),
            image: GoalSvg,
            altHref: 'Goal',
        },
    ]

    return(
        <div className="flex flex-col lg:flex-row gap-5 w-[83%] mx-auto h-min justify-center py-24">
            {sections.map((section) => (
                <div
                    key={section.key}
                    className="relative flex-1 flex-col mx-auto justify-center max-w-lg bg-black bg-opacity-15 rounded-3xl p-5 gap-20"
                >
                    <div className="relative mx-auto w-[70px] h-[70px]">
                        <section.image/>
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