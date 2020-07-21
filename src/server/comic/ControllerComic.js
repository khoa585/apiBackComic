import express from 'express';
const router = express.Router();
router.get("/",async(req,res)=>{
    res.send("phong");
})
router.get("/list",async(req,res)=>{
    res.send("phong2");
})
export default router ;