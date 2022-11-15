const express = require('express');
const cors= require("cors");
const server = express();
require('dotenv').config({path: "./config/.env"})
require('./config/db');
const port = process.env.PORT || 4000

const Blog = require('./model/blog')

server.use(cors())
server.use(express.json())


//Create and Save a Record of a Model
const Mouhamed = new Blog({
  name: "Mouhamed",
  age: 24,
  favoriteFoods: ['Apple' , 'banana']
});

Mouhamed.save(function(err, data) {
    if(err){
      console.log("Failed");
    } else {
      console.log("Saved Successful",data);
    }
  });

  //Create Many Records with model.create()
  const arrayOfPeople = [
    {
        id : 1,
        name : 'Ibrahima',
        age : 28,
        favoriteFoods: ['Mafe']
    },
    {
        id : 2, 
        name : 'Abdoulaye',
        age : 26,
        favoriteFoods: ['Thiou']
    }
  ]
//   Blog.create(arrayOfPeople, (err, data) =>{
//     if(err){
//         console.error(err);
//     }
//     else
//         console.log('Ajouté');
// })

//Use model.find() to Search Your Database
Blog.find({name: 'Ibrahima'}, function(err, found) {
    if (err) {
        console.log(err);
    }
    else
    console.log(found);

  });

//Use model.findOne() to Return a Single Matching Document from Your Database
Blog.findOne({ favoriteFoods:'Mafe'}, function(err, found) {
    if (err) {
        console.log(err);
    }
    else
    console.log(found);

  }  )

//Use model.findById() to Search Your Database By _id
Blog.findById( Blog.id, function (err, found) {
    if (err) {
        console.log(err);  
    } 
     else 
     console.log(found);
  });

//Perform Classic Updates by Running Find, Edit, then Save
  
  Blog.findByIdAndUpdate(Blog.id, (err, data) => {
    if (err) {
        console.log(err)
    }
      
    else{
        data.favoriteFoods.push('hamburger')
        data.save()
    }
})  

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
  
    Blog.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) {
        return (err);
      } 
        return updatedDoc
    })
  };

//Delete One Document Using model.findByIdAndRemove
Blog.findByIdAndRemove("6372eeae245d6081aa207128",(error, deleted) =>{
    if (error){
        console.log(deleted)
    }
})
//MongoDB and Mongoose - Delete Many Documents with model.remove()

Blog.remove({age: {$gt:28}}, (error, data)=>{
 if (error){
    console.log(error)
 }
})

//Chain Search Query Helpers to Narrow Search Results
Blog.find({favoriteFoods: {$all: ['Mafe']}})
.sort({age: 'asc'})
.limit(2)
.select('name')
.exec((error,data)=>{
    if(error){
        console.log(data)
    }
})

server.listen(port, function() {
    console.log('The server is running, ' +
        'please, open your browser at http://localhost:%s', 
        port);
  });