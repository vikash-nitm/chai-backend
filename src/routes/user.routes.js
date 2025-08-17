// import {Router} from "express";
// import { registerUser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router= Router()

//  router.route("/register").post(registerUser)


// registerUser



// //router.route("/register").post(registerUser)
// // router.route("/login").post(login)

// export default router



//8.56 ke badd lec 1

import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router= Router()


router.route("/register").post(
    upload.fields([
    {
        //first file ka naam
     name:"avatar",
     //kitna file aacept krenge to 1 kiye
     maxCount:1

    },
    {
     name:"coverImage",
     maxCount:1
    }

]),
registerUser

)

//router.route("/register").post(registerUser)
// router.route("/login").post(login)

export default router