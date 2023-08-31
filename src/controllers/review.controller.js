import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";
import Review from "../models/review.schema.js"
import Product from "../models/product.schema.js";


export const addReview = asyncHandler( async (req, res) => {
    const { user } = req
    const { productId , userId, comment , rating} = req.body;

    if (!productId || !comment || !rating) {
        throw new CustomError("Provide all details", 400)
    }

    if (rating > 10) {
        throw new CustomError("You can't rate more then 10 stars", 400)
    }

    const product = await Product.findById(productId)
    console.log(product)

    if (!product) {
        throw new CustomError("No such product", 404)
    }

    if (!user) {
        throw new CustomError("User not found", 404)
    }

    const review = await Review.create({
        productId,
        userId: user._id,
        comment,
        rating
    })

    res.status(200).json({
        succes: true,
        message: "Thank you for the review",
        review
    })
})

export const productReview = asyncHandler( async (req, res) => {
    const { id: productId } = req.params

    if (!productId) {
        throw new CustomError("Please provide a productId", 400)
    }

    const review = await Review.find({productId})

    res.status(200).json({
        review
    });
})
export const userReview = asyncHandler( async (req, res) => {
    const { id: userId } = req.params

    if (!userId) {
        throw new CustomError("Please provide a productId", 400)
    }

    const review = await Review.find({userId})

    res.status(200).json({
        review
    });
})