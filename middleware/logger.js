const logger = (req,res,next)=>{
    req.hello="hello everybody";
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports=logger
