const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getBootcamp = asyncHandler( async (req,res,next)=>{
  
      const bootcamp= await Bootcamp.findById(req.params.id);
      if(!bootcamp){
         return res.status(400).json({success:"false",format:"format not found"})
      }
      res.status(200).json({success:true,data:bootcamp})
  
    //res.status(200).json({success:true,msg:"see all bootcamp",hellooooo:req.hello});
})
exports.getBootcamps = asyncHandler( async (req,res,next)=>{
    //res.status(200).json({success:true,msg:`get  bootcamp ${req.params.id}`})
        const bootcamps=await Bootcamp.find();
        res.status(200).json({count:bootcamps.length,success:true,data:bootcamps})
})
exports.createBootcamp = asyncHandler( async (req,res,next)=>{

    console.log(req.body);
    const bootcamp = await Bootcamp.create(req.body);

res.status(201).json({
    success:true,   
    data:bootcamp
})

    //res.status(200).json({success:true,msg:"create new  bootcamp"})
})
exports.updateBootcamp = asyncHandler (async (req,res,next)=>{

    
     const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators:true
     })

     if(!bootcamp){
         //return res.status(400).json({success:false})
         return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`,404));
     }
res.status(200).json({success:true,data:bootcamp})
        //res.status(200).json({success:true,msg:`Update bootcamp ${req.params.id}`})

} )   
exports.deleteBootcamp = asyncHandler (async (req,res,next)=>{

    
            const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
                
            if(!bootcamp){
                //return res.status(400).json({success:false});
               return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`,404));
            }
            res.status(400).json({success:true,data:{}})
    
    //res.status(200).json({success:true,msg:`delete bootcamp ${req.params.id}`})
})
   



