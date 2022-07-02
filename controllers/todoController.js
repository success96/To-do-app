//#############     CONNECTING TO MONGODB CLUSTERS   #############
const uuid = require("uuid");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
//const URl = process.env.URL;

const {v4: uuid} = require("uuid");

const uri = "mongodb+srv://Success:BarCelonea96@cluster0.kvgci.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// The database to use
const dbName = "tasksDb";

//This function is to test the DB connection
exports.serverTestt =  () => {
    async function run () {
        try {
            await client.connect()
            console.log("Server is up and running!")
            console.log("Connected to DB server correctly");
            res.status(201).json({message: "WELCOME TO YOUR REGULAR TODO APP"});
        } catch(err){
            console.log({message: err.message})
        } finally{
            await client.close()
          }

    }
    run().catch(console.dir)
}


//This route is to create a DB Collection (table) 
exports.createTasksDb = async () => {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "tasks"
         db.collection("tasks");
    } catch (err) {
         console.log(err.message);
     }
     finally {
        await tasks.client.close();
    }
}

exports.add = async (req, res) => {
    //create a new task from client request
    //save new task to database
    //send back response to client
    //console.log(req.body.newFTask)
    try {
        await client.connect();
        console.log("Connected correctly to server");

        // Construct a document  
        const {title, description } = await req.body;
        const task = {
            _id: uuid(),
            title,
            description,
            time: new Date().toLocaleTimeString(),
        }
        // Insert a single document, wait for promise so we can read it back
        //const p = await col.insertOne(task);
        client.db(dbName).collection("tasks").insertOne(task);
        res.status(201).json({
            message: "Todo task successfully added",
            flight,
        })

    } catch (err) {
        res.status(500).json({message: err.message})
    } finally {
        await client.close();
    }
}

exports.alltasks = async (req, res) => {
    //fetch all existing tasks
    try {
        await client.connect();
        console.log("Connected correctly to server");

        let _id = req.params.id;
        
        const tasks = await client.db(dbName).collection("tasks").findOne({ });
        res.status(201).json({
            "message": "These are all todo tasks",
            "tasks": tasks
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    } finally {
        await tasks.client.close();
    }
}

exports.findOne = (req, res) => {
    //fetch a particular task with the given id
    //search for the required task from the task DB
    //send the task details corresponding to given id as response to the client
    //return a 404 error if id isnt found
    try {
        await client.connect();
        console.log("Connected correctly to server");

        let _id = req.params.id;
        
        const task = await client.db(dbName).collection("tasks").findOne({_id});
        if (task) {
            res.status(400).json({
            "message": "Task Found",
            "task": task
            })
        } else {
            return res.status(404).json({message: "Flight not found" })
        };
    } catch (err) {
        res.status(500).json({message: err.message})
    } finally {
        await client.close();
    }
}

exports.update = (req, res) => {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        let _id = req.params.id;
        const { title, description} = await req.body;

        
        const task = await client.db(dbName).collection("tasks").upsert({_id},{$set: {title, description}}, {upsert: true})
        res.json({message: `${task} updated successfully!`})
    } catch (err){
        res.status(500).json({message: err.message})
    } finally {
      await client.close();
    }
}

exports.delete = (req, res) => {
    //To delete an existing flight
    try {
        await client.connect();
        console.log("Connected correctly to server");

        let _id = req.params.id;
        
        const task = await client.db(dbName).collection("tasks").deleteOne({_id});
        if (task) {
            res.status(400).json({
            "message": "Task deleted",
            task,
            })
        } else {
            return res.status(404).json({message: "Flight not found" })
        };
    } catch (err) {
        res.status(500).json({message: err.message})
    } finally {
        await client.close();
    }
   
}
    
