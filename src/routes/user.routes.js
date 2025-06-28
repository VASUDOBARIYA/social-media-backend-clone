import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken,
    updateUserAvatar,
    updateUserCoverImage,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getUserChannelProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlewares.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import { verify } from "crypto";


const router = Router()

router.route("/register").post(
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  registerUser
);

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/changepassword").post(verifyJWT,changeCurrentPassword)
router.route("/getuser").get(verifyJWT,getCurrentUser)
router.route("/updateAccountDetail").patch(verifyJWT,updateAccountDetails)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/updateAvatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/updateCoverImage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getWatchHistory)

export default router