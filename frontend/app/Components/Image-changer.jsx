'use client'
import React, {useEffect, useState} from 'react';
import {gsap} from 'gsap';


const ImageChanger = () => {
    const [images, setImages] = useState([''])
    const [imageIndexer, setImageIndexer] = useState(0)

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch('/api/images')
            const data = await response.json();
            setImages(data)
        }
        fetchImages();

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndexer((prev) => (prev + 1) % images.length);
        }, 10000);
        console.log(interval);

        // Cleanup to avoid memory leaks
        return () => clearInterval(interval);
    }, [images]);

    useEffect(() => {
        const tl = gsap.timeline();

        // Zoom in the image
        tl.fromTo(
            '.image-container',
            { opacity: 0.5, scale: 1.4 }, // Starting state: slightly zoomed out and invisible
            { opacity: 1, scale: 1, duration: 5, ease: "power1.in" } // Zooms in and fades in over 2 seconds
        )
            .to('.image-container', { scale: 1.4, opacity: 1, duration: 5, delay: 0, ease: "power1.in" }); // Fade out the image after zooming in

    }, [imageIndexer]);
    

    return (
        <>
            {images && <div style={{backgroundImage: `url(/landing-page/${images[imageIndexer]})`}}
                            className={'image-container h-screen w-screen bg-no-repeat bg-cover overflow-hidden'}>

            </div>}
        </>
    );
};

export default ImageChanger;