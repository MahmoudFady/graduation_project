const User = require("../model/user");
exports.getAllWorkers = async (req, res, next) => {
  const workers = await User.find({ job: { $exists: true } });
  res.status(200).json({
    workers,
  });
};
// => GET WORKER BY JOB
exports.getWorkerByJob = async (req, res) => {
  const job = req.params["job"];
  const workers = await User.find({ job });
  res.status(200).json({
    workers,
  });
};
//ACCEPT WOKER FUNCTION
exports.acceptWorker = async (req, res, next) => {
  const userId = req.params.id;
  const newUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        accepted: true,
      },
    },
    { returnNewDocument: true, new: true, strict: false }
  ).select("-userPassword -__v");
  sendMailTo(newUser.userEmail, "تم الموافقه ع حسابك");
  res.status(200).json({
    message: "successfully add  worker",
    newUser: newUser,
  });
};
//BLOCK WORKER WOKER FUNCTION
exports.blockWorker = async (decode, req, res, next) => {
  const userId = req.params.id;
  const newUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        accepted: false,
      },
    },
    { returnNewDocument: true, new: true, strict: false }
  ).select("-userPassword -__v");
  res.status(200).json({
    message: "successfully add  worker",
    newUser: newUser,
  });
};
