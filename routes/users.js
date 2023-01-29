const express = require("express");
const { users } = require("./data/users.json");

const router =express.Router();






// To get all uses
router.get("/users",(req,res) =>{
    res.status(200).json({
      success: true,
      data : users
    })
  })
  
  
  // To get single user by id
  
  router.get("/users/:id",(req,res) =>{
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if(!user){
      return res.status(404).json({
        success: false,
        message : "User not found",
      });
    } 
    return res.status(200).json({
      success: true,
      data : users
    });
  });
  
  // POST Method
  
  router.post("/users",(req,res) =>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
    const user = users.find((each) => each.id === id);
    if(user){
    return res.status(404).json({
      success: false,
      message : "User already Exists",
    });
   
    }
    users.push({
      id,
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate
     });
     return res.status(201).json({
       success : true,
       data : users,
     });
  })
  
  
  
  
  
  // PUT Method
  
  router.put('/users/:id',(req,res)=>{
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if(!user){
     return res.status(404).json({
        success: false,
        message : "User Not Found",
      });
    }
    const updatedUser = users.map((each) => {
      if(each.id === id){
        return {
          ...each,
          ...data,
        };
      }
      return each;
    })
    return res.status(200).json({
      success : true,
      data : updatedUser,
    })
  
  })
  
  // DELETE the user
  router.delete('/users/:id',(req,res)=>{
    const { id } =req.params;
    const user = users.find((each) => each.id === id);
  
    if(!user){
      return res.status(404).json({
        success: false,
        message : "User to be deleted Not Found",
      });
    }
    const index = users.indexOf(user);
    users.splice(index,1);
  
    return res.status(200).json({
      success : true,
      data : users,
    })
  })

  module.exports = router;
  