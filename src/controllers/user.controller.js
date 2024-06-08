import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import uploadCloudnary from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = async(req, res) => {
    // Get user details from front-end
    const { fullName, email, username, password } = req.body;
    console.log("Email is :", email);
    console.log("Pass is :",password);
    console.log("Name is :",fullName);
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path; // Note: Corrected `avtar` to `avatar`
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required to create your account");
    }

    const avatar = await uploadCloudnary(avatarLocalPath);
    const coverImage = await uploadCloudnary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Cloudinary is required to store avatar in DB");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
};

export default registerUser;  // Changed to default export


// const registerUser = (req, res) => {
//     // Your registration logic here
//     res.send('User registered successfully');
// };
// //localhost:4000/api/users/register - registerUser
// export default registerUser;
