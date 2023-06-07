import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"],
        trim: true,
        maxLength: [120, "Product should not exceed 120 characters"]
    },
    price: {
        type: Number,
        required: ["true", "please provide a product price"],
        maxLength: [5, "product name should not be max than 5 chars"]
    },
    description: {
        type: String
    },
    photos: [
        {
            sucure_url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }
},{timestamps: true});

export default mongoose.model("Product",productSchema)