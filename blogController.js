const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const mongoose = require("mongoose");
// GET ALL BLOGS
 exports.getAllBlogsController = async(req,res) =>{
    try{
        const blogs = await blogModel.find({});
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No Blogs Found",
            });
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:"All Blogs lists",
            blogs,
        })
    
    
 } catch (error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"error while getting blogs",
        error,
    });

 }
}
//  Create Blog
 exports.createBlogController = async(req,res) =>{
    try{
        const {title,description,image,user} = req.body
        // validation
        if(!title || !description ||  !image || !user){
            return res.status(400).send({
                success:false,
                message:"okease provide all fields"
            })
        }
        const existingUser = await userModel.findById(user)
        // validation
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:"unable to find user",
                
            })
        }
        const newBlog = new blogModel({title,description,image,user});
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction();
        await newBlog.save();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:"Blog created",
            newBlog,
        })
    }catch (error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error while creating blog",
            error
        })
    }

 } 
//  update Blog
 exports.updateBlogController = async(req,res) =>{
 try{
    const {id} = req.params;
    const {title,description,image} = req.body;
    const blog = await blogModel.findByIdAndUpdate(
        id,
        {...req.body},
        {new: true}
    );

 }catch(error){
    console.log(error);
    return res.status(400).send({
        success:false,
        message:"error while updating",
        blog,
    });
 }
 };
//  Single Blog
 exports.getBlogByIdController = async (req,res) =>{
    try{
       const {id} = req.params;
       const blog = await blogModel.findById(id);
       if(!blog){
        return res.status(404).send({
            success:false,
            message:"blog not found",
            blog,

        });
       }
    }
    catch (error){
        console.log(error)
        return res.status(200).send({
            success:true,
            message:"error while getting single blog",
            error
        })

    }

 }

//  Delete Blog
 exports.deleteBlogController = async(req,res) =>{
    try {
      const blog = await blogModel.findOneAndDelete(req.params.id).populate("user")
      await blog.user.pull(blog)
      await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"blog deleted"
        })

    }
    catch (error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while deleting blog",
            error
        })
    }

 }
 exports.userBlogController = async(req,res) =>{
   try{
    const userBlog = await userModel.findById(req.params.id).populate("blogs")
    if(!userBlog){
        return res.status(404).send({
            success:false,
            message:"blogs not found"
        })
    }
    return res.status(200).send({
        success:true,
        message:"user blogs",
        userBlog,
    });

   }catch (error){
    console.log(error)
    return res.status(400).send({
        success:false,
        message:"error in user blog",
        error
    })
   }
 }