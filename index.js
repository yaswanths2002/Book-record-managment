const express = require("express");

const { users } = require("./data/users.json");

// importing routes

const usersRouter = require("./routes/users")
const booksRouter = require("./routes/books")

const app = express();

const PORT = 8082;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is started succesfully",
  });
});

app.use("/users",usersRouter);
app.use("/books",booksRouter);





// To get all uses
app.get("/users",(req,res) =>{
  res.status(200).json({
    success: true,
    data : users
  })
})


// To get single user by id

app.get("/users/:id",(req,res) =>{
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

app.post("/users",(req,res) =>{
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


app.get("*",(req,res)=>{
  res.status(404).json({
    message : "This route doesn't exist"
  });
});



// PUT Method

app.put('/users/:id',(req,res)=>{
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
app.delete('/users/:id',(req,res)=>{
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



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });

