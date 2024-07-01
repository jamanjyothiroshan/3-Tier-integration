const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

let app = express();
app.use(cors());

app.get("/getStudents",async (req,res)=>{
    let studentsArr = await Student.find();
    res.json(studentsArr);
})

app.listen(4567,()=>{
    console.log("listening to port 4567");
})

let studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z'-]+$/.test(v);
          },
          message: props => `${props.value} is not a valid first name!`
        },
        required: [true, 'first name is required'],
      },
      lastName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z'-]+$/.test(v);
          },
          message: props => `${props.value} is not a valid last name!`
        },
        required: [true, 'last name is required'],
      },
    age: {
        type: Number,
        min: [15, "Too early to create account"],
        max: [70, "Too late to create account"],
        require: [true,"age is mandatory"],
    },
    mobileNo: String,
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'email address is required'],
      },
    gender: {
        type: String,
        required: [true, "Gender is mandatory"],
        lowercase: true,
        enum: ["male","female","others"],
    },
});

let Student = new mongoose.model(`students`, studentSchema);

let insertDataIntoMDB = async () => {
    try {
        let preethi = new Student({
            firstName: "Preethi",
            lastName: "Jamanjyothi",
            age: 25,
            mobileNo: "+91-9966857321",
            email: "preethi@gmail.com",
            gender: "male"
        });
        await Student.insertMany([preethi]);
        console.log("Inserted data into Database successfully");
    } catch (err) {

        console.log(err);
        console.log("Inserting data into Database failed");
    }
};

let getDataFromDB = async()=>{
    let studentsArr = await Student.find();
    console.log(studentsArr);
};

let connectToMDB = async () => {

    try {
        await mongoose.connect("mongodb+srv://roshanjj8:roshanjj8@cluster0.6e0n25n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to Database");
        // insertDataIntoMDB();
        getDataFromDB();
    } catch (err) {
        console.log(err);
        console.log("Can't connect to Database");
    };

};

connectToMDB();