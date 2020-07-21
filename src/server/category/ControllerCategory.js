import express from 'express';
import  validator from 'express-validation';
import {responsHelper} from './../../common/responsiveHelper';
import {createCategory} from './ModelCategory';
import {VALIDATION_CREATE_CATEGORY} from './ValidationCategory';
const router = express.Router();
router.get("/",async(req,res)=>{
    res.send("phong");
})
router.post("/create",
    validator(VALIDATION_CREATE_CATEGORY),
    async(req,res)=>{
        try {
            console.log(req.body);
        } catch (error) {
            
        }
    })
export default router ;