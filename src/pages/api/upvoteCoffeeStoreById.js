const upvoteCoffeeStoreById=(req, res)=>{
    if(req.method === "PUT"){
        res.json({message: "Yay it worked"})
    }else{
        res.status(500).json({mesage: "only the PUT method is allowed"});
    }
}

export default upvoteCoffeeStoreById;