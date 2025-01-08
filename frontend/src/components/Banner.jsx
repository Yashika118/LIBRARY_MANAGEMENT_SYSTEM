import React from 'react'
import BANNER from "../../public/images/FrontCover2.png";

const Banner = () => {
    return (
        <>
            <div className='max-w-screen-2xl container gap-20 mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10'>
                <div className='order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-32'>
                    <div className='space-y-12'>

                        <h1 className='text-5xl font-bold'>
                            
                            Where Minds <span className='text-green-500'>Meet Books</span>
            
                        </h1>

                        <p className='text-xl'>
                            Discover a world of knowledge, adventure, and imagination. From timeless classics to modern bestsellers, our collection is curated to inspire every reader.Your next favorite book is just a click away!
                        </p>

                    </div>

                    {/* secondary btn */}
                    {/* <button className="btn btn-accent my-10 font-bold text-[16px]">Become an admin</button> */}
                </div>
                <div className='order-1 w-full mt-16 md:w-1/2'>
                    <img src={BANNER} alt="banner" className='w-[350px] h-[300px] md:w-[550px] md:h-[500px]'  />
                </div>
            </div>
        </>
    )
}

export default Banner