import User from '../models/user.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/CustomError.js'

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

export const signUp = asyncHandler( async(req,res)=> {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new CustomError("Please add all fields", 400)
    }

    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError("User already exists", 400)
    }

    const user = await User.create({
        name,email,password
    }) 

    const token = user.getJWTtoken();
    user.password = undefined

    res.cookie("token",token,cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError("Please provide email or password");
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new CustomError("Invalid user", 400);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (isPasswordMatched) {
        const token = await user.getJWTtoken();
        user.password = undefined;
        res.cookie("token", token, cookieOptions);
        res.status(200).json({
            success: true,
            token,
            user
        });
    } else {
        throw new CustomError("Password does not match!", 400);
    }
});

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

export const getProfile = asyncHandler( async(req, res) => {
    const {user} = req

    if(!user){
        throw new CustomError("User not found",401)
    }

    res.status(200).json({
        success: true,
        user
    })

})