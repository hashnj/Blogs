import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_Url } from "../config";

interface Blog {
  id: string;
  title: string;
  content: string;
  time: string;
  author: {
    name: string;
    email:string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
}

export const Getdata = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${Backend_Url}/api/v1/blog/bulk`, {
          headers: {
            authorization: token,
          },
        });

        setBlogs(response.data.blogs);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return {
    loading,
    blogs,
    user,
  };
};
