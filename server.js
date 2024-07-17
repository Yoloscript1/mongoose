const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error: ', err));

// Create a person model
const Person = require('./models/person');

// Create a new person
const hyderabadiBiryani = new Person({
  name: 'Hyderabadi Biryani',
  age: 25,
  favoriteFoods: ['Biryani', 'Chicken 65']
});

// Save the new person
hyderabadiBiryani.save((err, data) => {
  if (err) return console.error(err);
  console.log('Person saved:', data);
});


//Create Many Records with model.create()
const arrayOfPeople = [
    { name: 'John', age: 30, favoriteFoods: ['Pizza'] },
    { name: 'Jane', age: 25, favoriteFoods: ['Sushi'] },
    { name: 'Jim', age: 35, favoriteFoods: ['Burger'] }
  ];
  
  //Use model.find() to Search Your Database
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log('People created:', people);
  });

  //Use model.findOne() to Return a Single Matching Document
  Person.find({ name: 'John' }, (err, people) => {
    if (err) return console.error(err);
    console.log('People found:', people);
  });


  //Use model.findById() to Search Your Database By _id
  const personId = 'some_person_id_here';
Person.findById(personId, (err, person) => {
  if (err) return console.error(err);
  console.log('Person found by ID:', person);
});


//Perform Classic Updates by Running Find, Edit, then Save
Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Person updated:', updatedPerson);
    });
  });

  //Perform New Updates on a Document Using model.findOneAndUpdate()
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Person removed:', removedPerson);
  });

  
    //Delete Many Documents with model.remove()
  Person.remove({ name: 'Mary' }, (err, result) => {
    if (err) return console.error(err);
    console.log('People removed:', result);
  });

    //Chain Search Query Helpers to Narrow Search Results
  Person.find({ favoriteFoods: 'burritos' })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, people) => {
    if (err) return console.error(err);
    console.log('People found:', people);
  });
