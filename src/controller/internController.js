const collegeModel = require('../model/collegeModel');
const internModel = require('../model/internModel');
const validator = require('../utils/validator');

const createIntern = async (req, res)=>{
    try {
        let requestBody = req.body;
        if(Object.keys(requestBody).length === 0){
            return res.status(400).json({status:false, msg:`Invalid Input. Please enter intern details!`})
        }
        let {name, email, mobile, collegeId } = requestBody;

        if(!validator.isValidString(name)){
            return res.status(400).json({status:false, msg:`name is mandatory field!`})
        }
        if(!validator.isValidString(email)){
            return res.status(400).json({status:false, msg:`email is mandatory field!`})
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({status:false, msg:`Invalid email address!`})
        }
        if(validator.isValid(mobile)){
            return res.status(400).json({status:false, msg:`mobile number is mandatory field!`})
        }
        if(!/^[6-9]\d{9}$/.test(mobile)){
            return res.status(400).json({status:false, msg:`Invalid Mobile Number!`});
        }
        if(!validator.isValidString(collegeId)){
            return res.status(400).json({status:false, msg:`college ID is mandatory field!`})
        }
        if(!validator.isValidObjectId(collegeId)){
            return res.status(400).json({status:false, msg:`${collegeId} is not valid !`})
        }
        const findCollege = await collegeModel.findById(collegeId);
        if(!findCollege){
            return res.status(404).json({status:false, msg:`${collegeId} is not present in DB!`})
        }

        const internData = await internModel.create(requestBody);
        res.status(201).json({status:true, msg:'Intern Profile Successfully created',data:internData})
        
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }

}

const getCollegeDetails = async (req,res)=>{
    try {
      let collegeName = req.query.collegeName;
   
      if(!collegeName){
        return res.status(400).json({status:false, msg:`Query params must be present!`});
      }
      const collegeInfo = await collegeModel.findOne({name: collegeName, isDeleted:false});
      if(!collegeInfo){
        return res.status(400).json({status:false, msg:`Nothing found with given College Name. Try again using College Abbreveation.`});
      }
      const { name, fullName, logoLink} = collegeInfo;
   
      const collegeId = collegeInfo._id;
      const interns = await internModel.find({collegeId:collegeId, isDeleted:false}).select({_id:1,name:1,email:1,mobile:1});
      
   
      const data = {name, fullName, logoLink, interns};
      res.status(200).json({status:true, msg:data, count:interns.length});
   
   
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }





module.exports = {
    createIntern,
    getCollegeDetails
}