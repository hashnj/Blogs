import React, { useState } from "react";
import { Card } from "../components/Card";
import { Nav } from "../components/Nav";
import { Getdata } from "../hooks";
import axios from "axios";
import { Backend_Url } from "../config";
import { useNavigate } from "react-router-dom";

const Blogs: React.FC = () => {
    const { loading, blogs } = Getdata();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [activee, setActivee] = useState(false);
    const nav=useNavigate();
    const Skeleton: React.FC = () => (
        <>
            <Nav />
            <div className="flex flex-col w-full justify-center items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="p-2 m-5 w-3/4">
                        <div className="flex">
                            <div className="bg-slate-400 m-1 mt-0 w-8 h-8 flex justify-center items-center rounded-full animate-pulse"></div>
                            <div className="m-1 mt-0 h-8 flex justify-center items-center bg-slate-300 w-24 animate-pulse"></div>
                            <div className="m-1 mt-0 h-8 flex justify-center items-center bg-slate-300 w-24 text-slate-400 animate-pulse"></div>
                        </div>
                        <div className="font-bold text-xl mx-2 h-10 bg-slate-300 w-34 animate-pulse"></div>
                        <div>
                            <div className="m-2 mt-2 h-4 w-34 bg-slate-300 font-medium animate-pulse"></div>
                            <div className="m-2 mt-2 h-4 w-34 bg-slate-300 font-medium animate-pulse"></div>
                        </div>
                        <div className="m-2 animate-pulse"></div>
                        <div className='w-full flex justify-center items-center'>
                            <div className="bg-slate-300 h-0.5 w-1/2 animate-ping"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const postBlog = async () => {
        await axios.post(`${Backend_Url}/api/v1/blog`,{
            title,
            content
        },{
            headers:{
                Authorization:localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            console.log(res.data)
        })
        console.log("Posting blog:", { title, content });
        nav('/blogs')
    };

    if (loading) {
        return <Skeleton />;
    }

    return (
        <div>
            <Nav />
            <div className={`flex justify-center`}>
                <div className="flex m-5 w-3/4 border-b-2">
                    <div
                        onClick={() => setActivee(true)}
                        className="text-2xl font-bold px-2 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={`text-gray-400 py-2 h-12 border-black ${activee ? 'border-b-2' : ''}`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={()=>setActivee(false)}
                        className={`text-[20px] mx-2 py-2 cursor-pointer border-black text-gray-400 ${activee ? '' : 'border-b-2'}`}
                    >
                        For You
                    </div>
                </div>
            </div>
            <div className={`flex flex-col w-full justify-center items-center`}>
                {activee ? (
                    <div className="bg-white flex flex-col justify-center items-center w-full min-h-full overflow-hidden text-gray-700">
                        <div className="absolute text-4xl top-[172px] right-10 cursor-pointer text-gray-500 drop-shadow-[0px_5px_2px_rgba(0,0,0,0.9)]" onClick={() => { setActivee(e => !e) }}>X</div>
                        <div className="w-1/2 h-full">
                            <input
                                spellCheck="false"
                                type="text"
                                placeholder="Title"
                                className="bg-transparent font-bold font-serif text-5xl w-full focus:outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Tell Your Story"
                                className="bg-transparent font-medium font-serif text-xl w-full h-full focus:outline-none overflow-scroll"
                                value={content}
                                rows={25}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button className="bg-green-500 absolute top-[112px] text-xl px-4 py-1 rounded-md right-20" onClick={()=>{
                                postBlog();
                                // location.reload();
                                setActivee(false);
                                
                            }}>Publish</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:w-3/4 justify-center">
                        {blogs.map((blog, i) => (
                            <Card
                                key={i}
                                id={blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                pubDate={blog.time.split('T')[0]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
