"use client"
import Lottie from "lottie-react";
import * as wavesDouble from "../../public/animations/Waves-Double.json";
import * as wavesSingle from "../../public/animations/Waves-Single.json";

export const BackgroundFeatures = () => {
    return(
        <>
            <div className="overflow-hidden fixed left-0 top-0 scale-150 sm:scale-[200%] md:scale-[300%] transform origin-top-left">
              <Lottie animationData={wavesSingle} />
            </div>
            <div className="overflow-hidden fixed -bottom-48 right-0 scale-150 sm:scale-[200%] md:scale-[300%] transform origin-bottom-right">
                <Lottie animationData={wavesDouble} />
            </div>
        </>
    )
}