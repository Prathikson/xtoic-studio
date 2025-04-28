import React, { useRef, useState } from 'react'

const Hero = () => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);

    //0 % 4 = 0 + 1 => 1
    //1 % 4 = 1 + 1 => 2
    //2 % 4 = 2 + 1 => 3
    //3 % 4 = 3 + 1 => 4
    //4 % 4 = 0 + 1 => 1

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        setHasClicked( true);
        setCurrentIndex(upcomingVideoIndex)
    }

    const handleVideoLoad =() => {
        setLoadedVideos(upcomingVideoIndex);
    }
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    //Container
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        {/* Video Container */}
        <div id='viodeo-fram' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div>
                {/* Custom Css Classname - Manual Index.Css */}
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:opacity-100 hover:scale-100'>
                        <video ref={nextVideoRef} src={getVideoSrc(upcomingVideoIndex)} loop muted id='current-video' className='size-64 origin-center scale-150 object-cover object-center'/>
                        onLoadedData={handleVideoLoad}
                    </div>
                </div>
                <video ref={nextVideoRef} src={getVideoSrc(currentIndex)} loop muted id='next-video' className='absolute-center invisible absolute z-20 size-64 object-cover object-center' onLoadedData={handleVideoLoad}/>

                <video src={getVideoSrc(currentIndex === totalVideos + 1 ? 1 : currentIndex)} autoPlay loop muted id='' className='absolute left-0 top-0 size-full object-cover object-center' onLoadedData={handleVideoLoad}/>

            </div>
            <h1 className='special-font hero-heading uppercase absolute bottom-5 right-5 z-50 text-blue-75 '>
                Pr<b>a</b>thikson
            </h1>
            <div className='absolute left-0 top-0 z-40 size-full'>
                <div className='mt-24 px-5 sm:px-10'>
                    <h1 className='special-font hero-heading text-blue-100'>Po<b>r</b>tfoli<b>o</b></h1>
                    <p className='mb-5 max-w-65 font-robert-regular text-blue-100'>Enter the World of Infinite Possibilities<br/> The place where everything is possible</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Hero