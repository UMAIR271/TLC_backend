import Collection from '../models/collection.schema.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../services/CustomError.js';
import formidable from 'formidable';
import config from '../config/index.js';
import cloudinary from "../config/cloudinary.config.js";



export const createCollection = asyncHandler(async (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async function (error, fields, files) {
        if (error) {
            throw new CustomError(error.message || 'Something went wrong', 500);
        }

        if (!fields.name) {
            throw new CustomError("Please provide a collection name", 404);
        }

        const name = fields.name;
        
        const upload = await cloudinary.v2.uploader.upload(files.photo.filepath, {
            folder: config.CollectionImageFolder
        });
        
        let photo = upload.secure_url;
        
        const collection = await Collection.create({
            name,
            photo
        });
        
        if (!collection) {
            throw new CustomError("Collection not created", 400);
        }
        
        res.status(200).json({
            success: true,
            message: "Collection created successfully",
            collection
        });
    });
});
  


  
export const updateCollection = asyncHandler( async (req,res) =>{
    const { name } = req.body
    const { id: collectionId } = req.params;
  
    if (!name) {
        throw new CustomError("Collection name is required", 400);
    }
    
    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,{ name },
        {
            new: true,
            runValidators: true,
        }
    );
  
    res.status(200).json({
        success: true,
        message: 'Collection updated successfully',
        updateCollection
    })
  })
  
export const deleteCollection = asyncHandler( async (req,res) => {
    const { id: collectionId } = req.params
    
    const collectionToDelete = await Collection.findByIdAndDelete(collectionId)
  
    if(!collectionId) {
        throw new CustomError('Collection not found',404)
    }
    res.status(200).json({
        success: true,
        message: 'Collection deleted successfully'
    })
  })
  
export const getAllCollections = asyncHandler( async (req,res) => {
    const collections = await Collection.find();
  
    if(!collections){
        throw new CustomError('Collection not found',404)
    }
  
    res.status(200).json({
        success: true,
        collections
    })
  })

export const getCollectionById = asyncHandler( async (req,res) => {
    const { id: collectionId } = req.params
    
    if(!collectionId) {
        throw new CustomError('Collection not found',404)
    }
    const collection = await Collection.findById(collectionId)
  
    res.status(200).json({
        success: true,
        message: 'Collection details',
        collection 
    })
  })