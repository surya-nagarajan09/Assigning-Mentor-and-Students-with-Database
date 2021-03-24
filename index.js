const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config;
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const app = express();

//const dbUrl = "mongodb://127.0.0.1:27017";
//const dbUrl ="mongodb+srv://task_db:D2OW3FBnawvkk6QJ@taskone.2hsbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const dbUrl=process.env.DB_url || "mongodb://127.0.0.1:27017"
const port=process.env.PORT;
app.use(express.json());

/** mentor*/

app.get("/all", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("data");
    let data = await db.collection("mentor").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
  } catch (error) {
    console.log(error);
  }
});

/** create mentor */
app.post("/create_mentor", async (req,res) => {
  try{
    let mentor=await mongoClient.connect(dbUrl);
    let db=mentor.db("data");
    console.log(req.body)
    const newMentor={
      "id":req.body.id,
      "name":req.body.name,
      "mail":req.body.mail,
      "student":req.body.student
    }
  await db.collection("mentor").insertOne(newMentor);
    res.status(200).json({message:"mentor Created"});
    mentor.close();
  } catch(err)
  {
    console.log(err)
  }
})

/** get particular mentor */

app.get("/mentor/:id",async(req,res) => {
  try{
  let client= await mongoClient.connect(dbUrl);
  let db=client.db("data");
   await db.collection("mentor").findOne({_id:objectId(req.params.id)});
  console.log(data)
  res.send(data)
  }catch(err){
    console.log(err)
  }
})

/** assingn student */
app.put('/assign_student/:id', async(req, res)=>{
  try{
    let client=await mongoClient.connect(dbUrl);
    let db=client.db("database");
    await db.collection("mentor").findOneAndUpdate({_id:objectId(req.params.id)},{$set:req.body})
    
    res.status(200).json({message:"student assigned"})
   



  }catch(err){console.log(err)}
})



/** create- student */




app.listen(port,() =>console.log("app runs with" ,port));
