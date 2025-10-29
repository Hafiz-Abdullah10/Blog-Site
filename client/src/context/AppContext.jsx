import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

console.log("Base URL from env:", import.meta.env.VITE_BASE_URL);

// ✅ Create your own axios instance instead of mutating global axios
const appAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await appAxios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

useEffect(() => {
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    setToken(storedToken);
    appAxios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    console.log("✅ Authorization header set:", appAxios.defaults.headers.common['Authorization']);
  } else {
    console.log("⚠️ No token found in localStorage");
  }

  fetchBlogs();
}, []);

  const value = {
    axios: appAxios, // ✅ Provide your safe instance
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
