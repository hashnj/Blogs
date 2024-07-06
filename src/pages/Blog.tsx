import React, { useState, useEffect } from 'react';
import { Getdata } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Backend_Url } from '../config';
import axios from 'axios';
import { UpdateBlogInput } from '@hashnj/blobx-common';

type BlogType = {
  id: string;
  title: string;
  content: string;
  time: string;
  author: {
    name: string;
    email: string;
  };
};

type Params = {
  id: string;
};

const Skeleton: React.FC = () => (
  <div>
    <Nav />
    <div className="flex p-10 justify-center items-center w-screen h-screen">
      <div className="h-full p-2 w-2/3 rounded-xl shadow-dual-yellow border flex">
        <div className="w-full">
          <div className="absolute flex text-lg cursor-pointer" onClick={() => { history.back(); }}>{`< `}<div className="font-thin text-sm pl-1 pt-1">Back</div></div>
          <h1 className="text-4xl ml-2 mt-8 font-bold w-full h-12 bg-yellow-700/50 font-serif p-2 animate-pulse rounded-lg"></h1>
          <div className="animate-pulse rounded-md bg-yellow-700/50 h-6 ml-2 mt-2 w-28"></div>
          <hr className="h-px my-4 mx-2 w-2/3 bg-yellow-700/50 border-0 animate-pulse" />
          <div className="text-lg p-2 pt-4">
            <div className="bg-yellow-700/50 rounded-md w-full h-5 animate-pulse my-1"></div>
            <div className="bg-yellow-700/50 rounded-md w-full h-5 animate-pulse my-1"></div>
            <div className="bg-yellow-700/50 rounded-md w-full h-5 animate-pulse my-1"></div>
            <div className="bg-yellow-700/50 rounded-md w-full h-5 animate-pulse my-1"></div>
          </div>
        </div>
      </div>
      <div className="w-1/5 h-full mx-4 right-0">
        <div>
          <div className="font-thin p-2 animate-pulse">Author</div>
          <div className="flex">
            <div className="rounded-3xl hidden lg:flex h-7 w-7 justify-center items-center bg-yellow-700/30 m-2 font-serif font-semibold animate-pulse">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5"></circle>
                <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
              </svg>
            </div>
            <div>
              <div className="bg-yellow-700/20 text-gray-500 rounded-sm w-full animate-pulse p-1 font-bold font-serif ml-4 lg:m-0">Anonymous</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Blog: React.FC = () => {
  const { blogs, user, loading } = Getdata();
  const { id } = useParams<Params>();
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const nav = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (blogs.length > 0) {
      const blog = blogs.find((b: BlogType) => b.id === id);
      //@ts-ignore
      if (blog && blog.author.email === user.email) {
        setIsAuthor(true);
      }
    }
  }, [blogs, user, id]);

  useEffect(() => {
    if (edit) {
      const blog = blogs.find((b: BlogType) => b.id === id);
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
      }
    }
  }, [edit, blogs, id]);

  if (loading) {
    return <Skeleton />;
  }

  const blog = blogs.find((b: BlogType) => b.id === id);

  if (!blog) {
    return <div className="bg-yellow-900 flex justify-center items-center text-5xl">No blog found.</div>;
  }

  const post = async () => {
    try {
      const payload: UpdateBlogInput = {
        title,
        content,
        id: blog.id
      };
      //@ts-ignore
      const response = await axios.put(`${Backend_Url}/api/v1/blog`, payload, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
          'Content-Type': 'application/json',
        },
      });
      setEdit(false);
      location.reload();
      console.log('edit');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleDelete = async () => {
    
      try {
        await axios.delete(`${Backend_Url}/api/v1/blog/${blog.id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        nav('/blogs');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <div>
      <Nav />
      {edit ? (
        <div className="bg-white flex flex-col justify-center items-center w-full min-h-full overflow-hidden text-gray-700 mt-5">
          <div className="absolute text-4xl top-24 right-8 cursor-pointer text-gray-500 drop-shadow-[0px_5px_2px_rgba(0,0,0,0.9)]" onClick={() => setEdit(false)}>
            X
          </div>
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
            <button className="bg-green-500 absolute top-[102px] text-xl px-4 py-1 rounded-md right-20" onClick={post}>
              Publish
            </button>
          </div>
        </div>
      ) : (
        del ? (
          <div className="bg-yellow-900/20 w-screen h-screen flex justify-center items-center">
            <div className="bg-white rounded-xl flex flex-col p-10">
              <div className="text-xl ml-2 mb-5">Are you sure?</div>
              <div>
                <button className="mx-2 p-2 bg-red-700 rounded-md" onClick={handleDelete}>Delete</button>
                <button className="mx-2 p-2 bg-green-700 rounded-md" onClick={() => setDel(false)}>Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex p-10 justify-center items-center w-screen h-screen">
            <div className="h-full p-2 w-2/3 rounded-xl shadow-dual-yellow border flex">
              <div className="w-full">
              <div className={`${isAuthor ? 'justify-between' : ''} flex`}>
                  <div className="relative flex mt-1 text-lg cursor-pointer" onClick={() => { history.back(); }}>{`< `}<div className="font-thin text-sm pl-1 pt-1">Back</div></div>
                {isAuthor && (
                  <div className='relative flex'>
                    <button title="Edit"  className=" rounded-lg border p-2  bg-green-600 w-full" onClick={handleEdit}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
                      </svg></button>
                    <button title="Delete" className="rounded-lg border p-2 mx-1 bg-red-600 w-full" onClick={() => setDel(true)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z"></path>
                      </svg></button>
                  </div>
                )}</div>
                <h1 className="text-4xl ml-2 mt-8 font-bold w-full font-serif p-2">{blog.title}</h1>
                <div className="text-gray-400 font-serif text-sm pl-2">{blog.time}</div>
                <hr className="h-px my-4 mx-2 w-2/3 bg-gray-300 border-0" />
                <div className="text-lg p-2 pt-4">
                  {blog.content.split('\n').map((line, index) => (
                    <p key={index} className="my-1">{line}</p>
                  ))}
                </div>
                
              </div>
            </div>
            <div className="w-1/5 h-full mx-4 right-0">
              <div>
                <div className="font-thin p-2">Author</div>
                <div className="flex">
                  <div className="rounded-3xl hidden lg:flex h-7 w-7 justify-center items-center bg-yellow-700/30 m-2 font-serif font-semibold">
                    {blog.author?blog.author.name[0].toUpperCase():'A'}
                  </div>
                  <div>
                    <div className="text-gray-500 w-full p-1 font-bold font-serif ml-4 lg:m-0">
                      {blog.author?blog.author.name:"Anonymus"}
                    </div>
                    <div className='text-gray-500 ml-4 lg:m-0'>Absolute Legend</div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Blog;
