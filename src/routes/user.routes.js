// import { Router } from "express";
// import registerUser from "../controllers/user.controller.js"
// import { upload } from "../middlwares/multer.middleware.js";

// console.log('registerUser:', registerUser);
// console.log('upload:', upload);

// const router = Router();

// router.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         }, 
//         {
//             name: "coverImage",
//             maxCount: 1
//         }
//     ]),
//     registerUser
// );

// //localhost:4000/api/users/register - registerUser 

// export default router;
import { Router } from "express";
import registerUser from "../controllers/user.controller.js"; // Path to user.controller.js
import { upload } from "../middlwares/multer.middleware.js"; // Path to multer.middleware.js

const router = Router();

console.log('registerUser:', registerUser); // Should log the function definition

router.route("/register").post(registerUser);

export default router;
