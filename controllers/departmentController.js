const Department = require("../models/Department");

exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Please enter department name" });
    }

    let department = await Department.findOne({ name });
    console.log(department)
    if (department) return res.status(400).send({
      error: "Department with the name already exists"
    })
    department = new Department({
      name
    });

    await department.save();
    res.status(200).send({
      message: "Department created successfully",
      department
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const department_id = req.params.department_id;
    const department = await Department.findById(department_id);

    if (!department) {
      return res.status(404).send("No Department found");
    }

    res.status(200).send(department);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error " });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    if (!departments) {
      return res.status(404).send("No Departments found");
    }

    res.status(200).send(departments);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error " });
  }
};

exports.editDepartment = async (req, res) => {
  try {
    const updateFields = {};

    if (req.body.name) {
      updateFields.name = req.body.name;
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.department_id,
      updateFields
    );

    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).send({ message: "Department updated successfully " });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteDepartment = async (req, res) => {
  const department_id = req.params.department_id;

  const department = await Department.findByIdAndDelete(department_id);

  if (!department) {
    res.status(404).send({ error: "Department not found " });
  }

  res.status(200).send({ message: "Department deleted successfully" });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error " });
  }
};
