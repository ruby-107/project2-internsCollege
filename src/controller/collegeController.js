const collegeModel = require("../model/collegeModel");
const validator = require("../utils/validator");

const createCollege = async (req, res) => {
  try {
    const requestBody = req.body;

    if(Object.keys(requestBody).length === 0){
        return res.status(400).json({status:false, msg:`Invalid Input. Please enter college details!`})
    }
    let { name, fullName } = requestBody;

    if (!validator.isValidString(name)) {
      return res
        .status(400)
        .json({ status: false, msg: `College Name (abv) is required!` });
    }
    if (!validator.isValidString(fullName)) {
      return res
        .status(400)
        .json({ status: false, msg: `Full College Name is required!` });
    }

    const collegeData = await collegeModel.create(requestBody);
     res
      .status(201)
      .json({
        status: true,
        msg: `College created successfully`,
        data: collegeData,
      });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};


module.exports = {
  createCollege
};
