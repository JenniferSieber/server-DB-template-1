const model = require("../models/note");


module.exports = {
  // functions to export here
};

// Import dependencies
const Example = require('../models/example');

// Get all notes controller
const fetchExamples = async (req, res) => {
  const examples = await Example.find();
  res.json({ examples });
};

// Fetch a single example
const fetchExample = async (req, res) => {
  const exampleId = req.params.id;
  const example = await Example.findById(exampleId);
  res.json({ example });
};

// Create a example
const createExample = async (req, res) => {
  const { title, body } = req.body;
  const example = await Example.create({ 
    title,
    body
   });
  res.json({ example });
};

// Update a example
const updateExample = async (req, res) => {
  const exampleId = req.params.id;
  const { title, body } = req.body;
  await Example.findByIdAndUpdate(exampleId, {
    title, 
    body
  });
  const example = await Example.findById(exampleId);
  res.json({ example });
};


// Delete a record example
const deleteExample = async (req, res) => {
  const exampleId = req.params.id;
  await Example.deleteOne({ id: exampleId });
  res.json({ success: `Example id: ${exampleId} deleted`});
};

// Export the functions in an object
module.exports = {
  fetchExamples,
  fetchExample,
  createExample,
  updateExample,
  deleteExample
};
