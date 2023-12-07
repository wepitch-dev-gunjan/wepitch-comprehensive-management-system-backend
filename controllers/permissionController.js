const Permission = require("../models/Permission");

exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    let permission = await Permission.findOne({ name });
    if (permission) return res.status(400).send({
      error: "Permission already exists"
    })

    permission = new Permission({ name });
    await permission.save();
    res.status(200).send({
      message: "Permission added successfully",
      permission
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const { search } = req.query; // Extract the search string from query parameters
    let permissions;

    if (search) {
      permissions = await Permission.find({
        name: { $regex: new RegExp(search, "i") }, // Perform case-insensitive search
      });
    } else {
      permissions = await Permission.find();
    }

    if (!permissions) permissions = [];

    res.status(200).send(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const { permission_id } = req.params;
    const permission = await Permission.findOne({ _id: permission_id })

    res.status(200).send(permission)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const { permission_id } = req.params;
    const permission = await Permission.findOneAndDelete({ _id: permission_id });
    if (!permission) return res.status(400).send({
      error: "Permission not deleted"
    })

    res.status(200).send({
      message: "Permission deleted successfully",
      permission
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.editPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const { permission_id } = req.params;

    let permission = await Permission.findOneAndUpdate(
      { _id: permission_id },
      { name },
      { new: true } // To get the updated document as a result
    );

    if (!permission) {
      return res.status(400).send({
        error: "Permission not edited or not found",
      });
    }

    res.status(200).send({
      message: "Permission edited successfully",
      permission,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};