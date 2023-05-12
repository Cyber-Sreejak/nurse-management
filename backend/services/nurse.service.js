const NurseModel = require("../model/nurse.model");

//add new nurse
exports.nursePostService = async (req, res, next) => {
  try {

    let isRoundingManagerSelected = false

    if(req.body.isRoundingManager === "isRoundingManager"){
      isRoundingManagerSelected = true
    }

    const nurse = new NurseModel({
      fullName: req.body.fullName,
      email: req.body.email,
      contact: req.body.contact,
      workingDays: req.body.workingDays,
      dutyStartTime: req.body.dutyStartTime,
      dutyEndTime: req.body.dutyEndTime,
      isRoundingManager: isRoundingManagerSelected,
    });

    const response = await nurse.save();
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//delete nurse
exports.nurseDeleteService = async (req, res, next) => {
  await NurseModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Nurse Deleted."))
    .catch((err) => res.status(500).json("Error:" + err));
};

//get all nurses
exports.nurseGetAllService = async (req, res, next) => {
  await NurseModel.find().sort({isRoundingManager: 'desc', fullName: 'asc'})
    .then((Nurse) => res.json(Nurse))
    .catch((err) => res.status(500).json("Error:" + err));
};

//update nurse
exports.nurseUpdateService = async (req, res, next) => {
  await NurseModel.findById(req.params.id)
    .then((nurse) => {
      (nurse.fullName = req.body.fullName),
      (nurse.email = req.body.email),
      (nurse.contact = req.body.contact),
      (nurse.workingDays = req.body.workingDays),
      (nurse.dutyStartTime = req.body.dutyStartTime),
      (nurse.dutyEndTime = req.body.dutyEndTime),
      (nurse.isRoundingManager = req.body.isRoundingManager),
      nurse
        .save()
        .then((nurse) => res.status(200).json("Nurse updated."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(500).json("Error:" + err));
};

//getnurse by id
exports.nurseGetService = async (req, res, next) => {
  await NurseModel.findById(req.params.id)
    .then((Nurse) => res.json(Nurse))
    .catch((err) => res.status(500).json("Error:" + err));
};
