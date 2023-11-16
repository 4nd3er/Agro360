export default function errorResponse(res, error){
    return res.status(500).json({ error: error.message })
}