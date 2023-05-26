import Product from '../models/product.schema.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../services/CustomError.js';
import formidable from 'formidable';
import mongoose from 'mongoose';
import fs from 'fs'
import cloudinary from "../config/cloudinary.config.js";
import config from '../config/index.js';

export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async function (error, fields, files) {
    if (error) {
      throw new CustomError(error.message || 'Something went wrong', 500);
    }

    let productId = new mongoose.Types.ObjectId().toHexString();

    if (
      !fields.name ||
      !fields.price ||
      !fields.description ||
      !fields.collectionId
    ) {
      throw new CustomError('Please fill all the fields', 400);
    }
    
    
    let imageUpload = [];
    for (const fileKey in files) {
      const file = files[fileKey];
      const upload = await cloudinary.v2.uploader.upload(file.filepath, {
        folder: config.folderName
      })
      console.log(upload)
      imageUpload.push({ sucure_url: upload.secure_url , imageName: upload.original_filename })
    }
    console.log(imageUpload)
    const product = await Product.create({
      _id: productId,
      photos: imageUpload,
      ...fields,
    });
    if (!product) {
      throw new CustomError('Product failed to be created in DB', 400);
    }
    res.status(200).json({
      success: true,
      product,
    });
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const {id: productId} = req.params

  const product = await Product.findById(productId)

  if (!product) {
      throw new CustomError("No product found", 404)
  }

  res.status(200).json({
      success: true,
      product
  })
})

export const getProductByCollectionId = asyncHandler(async(req, res) => {
  const {id: collectionId} = req.params

  const products = await Product.find({collectionId})

  if (!products) {
      throw new CustomError("No products found", 404)
  }

  res.status(200).json({
      success: true,
      products
  })
})