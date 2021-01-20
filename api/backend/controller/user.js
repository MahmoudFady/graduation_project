const User = require("../model/user");
const Post = require("../model/post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// SIGN UP FUNCTION
exports.signup = async (req, res, next) => {
  console.log(" sign up router");
  //CATCH MUTUAL DATA BETWEEN WORKER AND USER
  const {
    userName,
    userEmail,
    userBigCity,
    userCity,
    userPhone,
    userPassword,
    isWorker,
  } = req.body;
  console.log(isWorker);
  const user = await User.findOne({ userEmail: userEmail });
  // CHEACK IF EMAIL IS ALREADY TOKEN OR NOT
  if (!user) {
    //CATCH THE STATIC PATH OT SHARE IMAGES OR UPLOADS IMAGES
    const url = req.protocol + "://" + req.get("host") + "/uploads/";
    // CHECK IF USE IS WORKER OR NOT
    // ENCRYBT USER PASSWORD
    const hash = await bcrypt.hash(userPassword, 10);
    // HANDEL MUTUAL DATA INTO OBJECT
    const MUTUAL = {
      profileImage: url + "default_profile.png",
      userName,
      userEmail,
      userPhone,
      userBigCity,
      userCity,
      userPassword: hash,
    };
    // IF USER
    if (isWorker == "false") {
      // STORE DATA INTO DB
      const newUser = await new User({
        ...MUTUAL,
      }).save();
      // SEND TOKEN IF USER
      const token = jwt.sign(
        { userId: newUser._id, userEmail: userEmail },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).json({
        message: "successfully user sign up",
        token: token,
        user: newUser,
      });
    }
    // IF WORKER
    else {
      //  CATCH WORKER JOB
      console.log(req.body);
      const job = req.body.job;
      const workerIdentityImages = req.files.map((file) => {
        return url + file.filename;
      });
      // IF HE IS WORKER WE ADD NEW FILED (job, workerIdentityImages , accepted);
      const newUser = await new User({
        ...MUTUAL,
        job,
        accepted: false,
        workerIdentityImages,
      }).save();
      await User.findByIdAndUpdate(
        newUser._id,
        {
          $set: {
            job,
            accepted: false,
            workerIdentityImages,
          },
        },
        {
          //options
          returnNewDocument: true,
          new: true,
          strict: false,
        }
      );
      res.status(200).json({
        message: "successfully worker sign up",
      });
    }
  } else {
    res.status(201).json({
      message: "this email already used",
      duplicatedEamil: true,
    });
  }
};
// SIGN IN FUNCTION
exports.signin = async (req, res, next) => {
  // CATCH EMAIL AND PASSWORD FROM BODY
  const { userEmail, userPassword } = req.body;
  // GET USER FORM DB
  const user = await User.findOne({ userEmail: userEmail });
  // IF USER IS EXIST
  if (user) {
    // COMPARE PASSWORD
    const isPasswordSame = await bcrypt.compare(
      userPassword,
      user.userPassword
    );
    /**
     * IF PASSWORD IS OK
     *  AND
     *  IF HE IS NOT WORKER ACCPTED MUST  = UNDEFINED
     * OR
     * HE IS WORKER ACCEPTED MUST = TRUE
     */
    if (
      isPasswordSame &&
      (user.accepted === undefined || user.accepted === true)
    ) {
      const user = await User.findOne({ userEmail: userEmail }).select(
        "-__v -userPassword"
      );

      const token = jwt.sign(
        { userId: user._id, userEmail: user.userEmail },
        process.env.JWT_SECRET_KEY
      );

      res.status(200).json({
        message: "successfully sign in",
        token,
        user,
      });
    }
    // IF ACCEPTED = FALSE
    else if (user.accepted === false) {
      res.status(406).json({
        message: "sorry your account did not accepted yet",
      });
    }
    // OTHER WHISE SIGNIN MUST FAILD
    else {
      res.status(200).json({
        message: "faild to sign in",
      });
    }
  }
  // IF USER DOESNT EXIST
  else {
    res.status(200).json({
      message: "faild to sign in",
    });
  }
};

// get one user by it's id
exports.getUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-userPassword -__v");
  if (user) {
    const userPosts = await Post.find({ creator: userId }).populate({
      path: "creator",
      select: "_id userName profileImage",
    });
    res.status(200).json({
      message: "successfully get user",
      user,
      userPosts,
    });
  } else {
    res.status(204).json({
      message: "user does not exist",
    });
  }
};
// GET ALL USER FUNCTION
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find().select("-userPassword -__v");
  if (users.length > 0) {
    res.status(200).json({
      message: "successfully get all users ",
      usersCount: users.length,
      users,
    });
  } else {
    res.status(200).json({
      message: "no existed user yet",
    });
  }
};
// EDIT USER FUNCTION
exports.edit = async (decode, req, res, next) => {
  const {
    userName,
    userEmail,
    userPhone,
    userBigCity,
    userCity,
    job,
  } = req.body;
  const userOld = await User.findById(decode.userId);
  let profileImage = userOld.profileImage;
  if (req.file) {
    profileImage =
      req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  }
  const newUser = await User.findByIdAndUpdate(
    decode.userId,
    {
      $set: {
        profileImage,
        userName,
        userEmail,
        userPhone,
        userBigCity,
        userCity,
        job,
      },
    },
    {
      returnNewDocument: true,
      new: true,
    }
  ).select("-userPassword -__v");
  res.status(200).json({
    message: "successfully user updated",
    newUser,
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
