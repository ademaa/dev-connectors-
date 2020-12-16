const express =require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("API running succesfully");
})

const port = process.env.PORT || 5000;
app.listen(port ,()=> console.log(`server starts at port ${port}`));