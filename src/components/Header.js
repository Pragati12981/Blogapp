import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Box,AppBar,Toolbar,Button,Typography,Tabs,Tab} from '@mui/material'
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { authActions } from '../redux/store';

const Header = () => {
  const isLogin = useSelector(state=>state.isLogin)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(isLogin);
  const [value,setValue] = useState()
  // 
  const handleLogout = () =>{
    try{
       dispatch(authActions.logout())
       alert('logout succussful')
       navigate('/login')
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
    <AppBar position='sticky'>
    <Toolbar>
      <Typography variant = 'h4'>
        My Blog App
      </Typography>
      {isLogin && (

      
      <Box display= {'flex'} marginLeft="auto" marginRight={"auto"}>
      <Tabs textColor = "inherit" value={value} orChange={(e,val) => setValue(val)}>
        <Tab label="Blogs" LinkComponent={Link} to = "/blogs"/>
        <Tab label="My Blogs" LinkComponent={Link} to = "/my-blogs"/>
      </Tabs>
     </Box>
     )}
      <Box display = {'flex'} marginLeft="auto">
      {!isLogin && (<>
      
        <Button sx = {{margin:1,color:"white"}} LinkComponent={Link} to = "/login">Login</Button>
        <Button sx = {{margin:1,color:"white"}} LinkComponent={Link} to = "/register">Register</Button>
        </>
        )}
        {isLogin && (
        <Button onClick={handleLogout} sx = {{margin:1,color:"white"}}>Logout</Button>
        )}
      </Box>
    </Toolbar>


    </AppBar>
      
    </>
  )
}

export default Header
