import axios from "axios";
import { Backend_Url } from "../config";
import { useState } from "react";

export const AddBlog=()=>{
    
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

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
        location.reload();
    };

    return(
        <div className="bg-white flex flex-col justify-center items-center w-full min-h-full overflow-hidden text-gray-700">
                        <div className="absolute text-4xl top-[172px] right-10 cursor-pointer text-gray-500 drop-shadow-[0px_5px_2px_rgba(0,0,0,0.9)]" onClick={() => {  }}>X</div>
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
                                
                            }}>Publish</button>
                        </div>
                    </div>
    )
}