export default function breed(req, res){
    const query = req.query.name
    return res.status(200).json({message: `I love ${query}`})
}