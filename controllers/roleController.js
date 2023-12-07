const Role = require("../models/Role");

exports.createRole = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, permissions } = req.body;

    // Create a new role instance using the Role model
    const newRole = new Role({
      name,
      permissions: permissions || [],
    });

    // Save the new role to the database
    const createdRole = await newRole.save();

    res.status(201).json(createdRole); // Return the created role as a response
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getRole = async (req, res) => {
  try {
    const { role_id } = req.params; // Extract role ID from request parameters
    const role = await Role.findOne({ _id: role_id });

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json(role); // Return the role as a response
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    res.status(200).send(roles)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.editRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).send({
      error: "Role name is required"
    })

    let role = await Role.findOne({ name });
    if (role) return res.status(400).send({
      error: "The role name is already exists, please choose another name"
    })
    role = await Role.findOne({ _id: role_id });

    role = { name }
    await role.save();
    res.status(200).send({
      message: "role name updated succesfully",
      role
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const role = await Role.findByIdAndDelete({ _id: role_id });
    if (!role) return res.status(400).send({
      error: "Role not deleted"
    })

    res.status(200).send({
      message: "Role deleted successfully",
      role
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};