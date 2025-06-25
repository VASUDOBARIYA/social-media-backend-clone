import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken,
    updateUserAvatar,
    updateUserCoverImage
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlewares.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js";


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
router.route("/refresh-token").post(refreshAccessToken)
router.route("/updateAvatar").post(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/updateCoverImage").post(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
export default router