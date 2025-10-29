import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../assets/images/38.jpg";
import img2 from "../assets/images/5.webp";
import img3 from "../assets/images/38.jpg";
import img4 from "../assets/images/PLASCENE.webp";
import img5 from "../assets/images/PLENMA.jpg";
import img6 from "../assets/images/ROADMAP.jpg";

const images = [img2, img6, img3, img4, img5, img1];

const ImageSlider = () => {
    return (
        <div className="relative w-full bg-base-200 rounded-lg overflow-hidden shadow-md">
            <Carousel
                autoPlay
                infiniteLoop
                interval={4000}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                emulateTouch
                swipeable
                transitionTime={800}
                dynamicHeight={false}
                stopOnHover
                className="w-full"
            >
                {images.map((src, index) => (
                    <div key={index} className="relative w-full">
                        <img
                            src={src}
                            alt={`slide-${index}`}
                            className="w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[600px] object-fill object-center transition-transform duration-500 hover:scale-105"
                        />
                        {/* Overlay gradient */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
                        {/* Caption text */}
                        {/* <div className="absolute bottom-4 left-6 text-left text-white">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold drop-shadow-lg">
                                Hình ảnh {index + 1}
                            </h2>
                            <p className="text-sm text-white/80">Mô tả ngắn gọn nội dung ảnh</p>
                        </div> */}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageSlider;
