import { Link } from "react-router-dom"

interface CardProps{
    id:string,
    authorName:string,
    title:string,
    content:string,
    pubDate:string
}


export const Card=({
    id,authorName,title,content,pubDate
}:CardProps)=>{
    // console.log(id);
    return(
        
        <Link to={`/blog/${id}`}>
        <div className="p-4  w-4/5  cursor-pointer mx-14">
            <div className="flex">
                <div className="bg-slate-300 m-1 mt-0 w-8 h-8 flex justify-center items-center rounded-full">
                    {authorName ? authorName[0].toUpperCase(): <svg width='20' height='20' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5"></circle> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg> }
                    </div>
                    <div className="m-1 mt-0 h-8 flex justify-center items-center"> {authorName ? authorName :"Anonymus" }</div>
                 .
                 <div className="m-1 mt-0 h-8 flex justify-center items-center text-slate-400"> {pubDate}</div> 
            </div>
            <div className="font-bold text-xl mx-2">
                {title}
            </div>
            <div className="mx-2 font-medium">
                {content.slice(0,100)+'....'}
            </div>
            <div className="m-2 font-thin">
                {`${Math.ceil(content.length/100)} ${Math.ceil(content.length/100)>1?'minutes':'minute'} read`}
            </div>
            <div className="bg-slate-200 h-0.5 w-full"></div>
        </div>
        </Link>
    )
}