import React,{useState,useEffect} from 'react'
import BlogCard from '../components/BlogCard';
import axios from 'axios';
const Blogs = () => {
  const [blogs,setBlogs] = useState([])
  // get blogs
  const getAllBlogs = async() =>{
    try{
   const {data} =  await axios.get('api/v1/blog/all-blog')
   if( data?.success){
    setBlogs(data?.blogs)
   }
    }catch(error){
      console.log(error)
    }

  }
  useEffect(()=>{
   getAllBlogs();
  },[]);
  return (
    <div>
    {blogs && blogs.map(blog=>(
      <BlogCard/>
    ))}
  
      
    </div>
  )
}

export default Blogs
