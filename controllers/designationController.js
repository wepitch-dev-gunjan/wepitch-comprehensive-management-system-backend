const Designation = require("../models/Designation");
const Department = require('../models/Department');
const Role = require("../models/Role");

exports.createDesignation = async (req, res) => {
  try {
    // Extract data from the request body
    const { profile, department, role } = req.body;

    const departmentName = await Department.findOne({ name: department });
    if (!departmentName) return res.status(400).send({
      error: "Department not found"
    })

    const roleName = await Role.findOne({ name: role });
    if (!roleName) return res.status(400).send({
      error: "Role not found"
    })

    // Create a new designation instance using the Designation model
    const designation = new Designation({
      profile,
      department,
      role,
    });

    // Save the new designation to the database
    await designation.save();
    res.status(201).json(designation); // Return the created designation as a response
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getDesignation = async (req, res) => {
  try {
    const { designation_id } = req.params;
    const designation = await Designation.findOne({ _id: designation_id })

    if (!designation) return res.status(404).send({
      error: "Designation not found"
    })

    res.status(200).send(designation)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.getDesignations = async (req, res) => {
  try {
    const { profile, department, role } = req.query;
    const filter = {}

    if (profile) filter.profile = profile;
    if (department) filter.department = department;
    if (role) filter.role = role;

    const designations = await Designation.find(filter);

    res.status(200).send(designations)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.editDesignation = async (req, res) => {
  try {
    const { designation_id } = req.params;
    const { profile, department, role } = req.body;

    const filter = {}

    if (profile) filter.profile = profile;
    if (department) filter.department = department;
    if (role) filter.role = role;

    filter._id = designation_id;
    let designation = await Designation.findOne({ _id: designation_id });
    if (!designation) return res.status(404).send({
      error: 'Designation not found'
    })

    designation = filter;
    await designation.save()

    res.status(200).send(designation)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.deleteDesignation = async (req, res) => {
  try {
    const { designation_id } = req.params;
    const designation = await Designation.findOneAndDelete({ _id: designation_id });

    if (!designation) return res.status(400).send({
      error: 'Designation not deleted'
    })

    res.status(200).send({
      message: "Designation succesfully deleted"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};