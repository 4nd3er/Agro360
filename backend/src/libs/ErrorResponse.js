export default function errorResponse(res, error){
    console.log(error)
    return res.status(500).json({ error: error.message })
}