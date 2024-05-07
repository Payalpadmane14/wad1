const express = require('express')
const mongoose = require('mongoose')
const student = require('../models/student')
const router  = express.Router();




// //create a document
router.post('/api/student', async (req, res) => {
  try {
    const newStudent = await student.create(req.body);
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//reaad all the documet 
router.get('/api/student', async (req, res) => {
  try {
    const newStudent = await student.find({})
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//read only one document 
router.get('/api/student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Find student by ID
    const foundStudent = await student.findById(id);
    // Return the found student
    res.status(200).json(foundStudent);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

//update the document
router.put('/api/student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Data to update

    // Find student by ID and update
    const updatedStudent = await student.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document after update
      runValidators: true // Validate the updated data
    });

    // Check if student with the given ID exists
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the updated student
    res.status(200).json(updatedStudent);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a student by ID
router.delete('/api/student/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find student by ID and delete
    const deletedStudent = await student.findByIdAndDelete(id);

    // Check if student with the given ID exists
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return success message
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;