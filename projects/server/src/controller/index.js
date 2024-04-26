import User from '../model/index.js';
import  uploadOnCloudinary  from '../utills/cloudinary.js';

const createRagistation=async(req, res)=>{
    try{
        const {body} = req;
        if(!body.profileUrl || !body.email || !body.name || !body.userName || !body.contact){
            return res.status(400).json({
                message:'Please fill all the fields',
                status:0
            });
        }
        console.log(body)
        if(body._id){
            const data = await User.findOne({_id:body._id});
            if(!data){
                return res.status(400).json({
                    message:'User not found',
                    status:0
                });
            }
            const updateData= await User.findByIdAndUpdate(body._id, body, {new:true});
            console.log({updateData}) 
            return res.status(201).json({
                message:'Data updated successfully',
                data:updateData,
                status:1
            })
        }
        const data= await User.findOne({email:body.email});
        if(data){
            return res.status(400).json({
                message:'Email already exist',
                status:0
            });
        }
       
        const user = await User.create(req.body);
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).send(err);
    }
   
}

const uploadImage=async(req, res)=>{
    try{
        const uploadFile=req.file.path;
        if(!uploadFile){
            return res.status(400).json('Please upload a file');
        }
        const profilePic=  await uploadOnCloudinary(uploadFile);
        if(profilePic.url){
            res.status(201).json({
                status:1,
                message:'Image uploaded successfully',
                url:profilePic.url
            });
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

const getAllUser=async(req,res)=>{
    try{
        const data= await User.find({})
        res.status(200).json({
            status:1,
            data:data.reverse(),
            message:"Success"
        })
    }catch(err){
        res.status(500).json({
            status:0,
            message:err
        })
    }
    
}

const deleteUser=async(req,res)=>{
        try{
            const {id}= req.params
            if(!id){

                return res.status(400).json({
                    status:0,
                    message:"Please provide user id"
                })
            }
            const data= await User.findById(id)
            if(!data){
                return res.status(400).json({
                    status:0,
                    message:"User not found"
                })
            }
            await User.findByIdAndDelete(id)
            res.status(200).json({
                status:1,
                message:"User Deeleted Successfully",
                data
            })

        }
        catch(err){
            res.status(200)
        }
}
    
export {createRagistation,uploadImage,getAllUser,deleteUser}