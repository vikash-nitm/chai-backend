// import { asyncHandler } from "../utils/asyncHandler.js";

// const registerUser=asyncHandler(async (req,res)=>{
// //  res.status(200).json({
// //         message:"chai aur code"
// //     })

// //yha register krna hai user ko
// // get user details from frontend
// ///validation-not empty(mtlb user sb shi bheja hai n mtlb email empty ya correct format mai hai)
// //check if user already exists:check krna hai username or email se
// //check for image,check for avatar
// //upload them to cloudinary(yha akbr check krna hoga ki avtar hi ya nhi)
// //
// //yha tk user ne hme data diya mene imge li or imge ko cloudinry
// //pe upload krdiya or fir clodinry se image wapas aagai hai
// //imge

// //ab create user object-create entry in db
// //remove password and refresh token field from response
// //check for user creation
// //return res

// const {fullname,email,username,password}=req.body
// console.log("email: ",email);



// })

// export {registerUser}

//8.56 ke baad lec 1
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async (req,res)=>{
 
//  res.status(200).json({
//         message:"chai aur code"
//     })

//yha register krna hai user ko
// get user details from frontend
///validation-not empty(mtlb user sb shi bheja hai n mtlb email empty ya correct format mai hai)
//check if user already exists:check krna hai username or email se
//check for image,check for avatar
//upload them to cloudinary(yha akbr check krna hoga ki avtar hi ya nhi)
//
//yha tk user ne hme data diya mene imge li or imge ko cloudinry
//pe upload krdiya or fir clodinry se image wapas aagai hai
//imge

//ab create user object-create entry in db
//remove password and refresh token field from response
//check for user creation
//return res

const {fullname,email,username,password}=req.body
console.log("email: ",email);

//agr koi empty hai array mai to 400,all field are required bhejega
if(
    [fullname,email,username,password].some((field)=>
    field?.trim()==="")
    )
{
throw new ApiError(400,"All fields are required")
}

    
    //agr same username,ya email mil jye tb ye error ayega
    // "User with email or username already exists"
    
const existedUser=User.findOne({
    $or:[{username},{email}]
})

if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
}

//req.body mai sara body ka excess ata hai
//req.file mai multer acesss deta hai

const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}

  const avatar= await uploadOnCloudinary(avatarLocalPath)
  const coverImage=await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400,"Avatar file is required")
  }
  //database se user hi bt kr rha hai
   const user= await User.create({
    fullname,
    avatar:avatar.url,
    //agr coverimage hai to nikal lo nhi to empty rhne do
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()

  })

  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
  }

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
)


})

export {registerUser}
