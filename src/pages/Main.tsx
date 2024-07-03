import { useNavigate } from 'react-router-dom';
import { Nav } from '../components/Nav';
// import { useEffect, useState } from 'react';

const Main = () => {
    const navigate = useNavigate();


    return (
        <>
        {/* {tOut ? <div className='h-screen w-screen bg-yellow-900 flex justify-center items-center'></div>: */}
            <div className='h-screen w-screen relative'>
                <Nav />
                <div className='h-full absolute w-full md:bg-yellow-900/90 clip-bg'></div>
                <div className='h-full absolute w-full md:bg-yellow-200/90 clip-me'></div>
                <div className='h-full w-full flex flex-col justify-center items-center  '>
                    <div className='max-h-full w-full text-xl text-yellow-900 p-8 md:p-16 lg:p-28 lg:pr-36 z-10 cursor-default'>
                        Welcome to BloB, your go-to platform for sharing ideas, stories, and insights with a global community of readers and writers. Whether you're an aspiring writer or an experienced blogger, BloB provides a space to express your thoughts and connect with like-minded individuals. Dive into a diverse collection of articles on various topics, from personal growth and technology to travel and lifestyle. Join us in fostering a vibrant community where your voice matters and your stories inspire. Start writing, start reading, and start making an impact with BloB.
                    </div>
                    <button onClick={() => navigate('/blogs')} className=' bottom-28 rounded-lg px-5 py-1 text-2xl text-yellow-200 hover:bg-yellow-800 z-10 hover:text-yellow-100 bg-yellow-900'>
                        Blogs
                    </button>
                </div>
            </div>
{/* } */}
        </>
    );
};

export default Main;
