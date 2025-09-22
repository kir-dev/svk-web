"use client"
import Lottie from "lottie-react";
import * as animationData from "../../public/animations/Waves-Double.json";

export const BackgroundFeatures = () => {
    return(
        <>
            <div className="fixed transform rotate-180 left-0 top-0">
                <div className="overflow-hidden transform origin-bottom-right scale-150 sm:scale-[200%] md:scale-[300%]">
                    <Lottie animationData={animationData} />
                </div>
            </div>
            <div className="overflow-hidden fixed bottom-0 right-0 scale-150 sm:scale-[200%] md:scale-[300%] transform origin-bottom-right">
                <Lottie animationData={animationData} />
            </div>
        </>
    )
}