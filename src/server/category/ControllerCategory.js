import express from 'express';
import  validator from 'express-validation';
import {responsHelper} from './../../common/responsiveHelper';
import {createCategory,getListCategory} from './ModelCategory';
import {VALIDATION_CREATE_CATEGORY} from './ValidationCategory';
import {getData,putData} from './../../common/cache';
const router = express.Router();
router.get("/",async(req,res)=>{
    res.send("phong");
})
router.post("/create",
    validator(VALIDATION_CREATE_CATEGORY),
    async(req,res)=>{
        try {
            let resultCreate = await createCategory(req.body);
            return responsHelper(req,res,null,resultCreate);
        } catch (error) {
            console.log(error);
            return responsHelper(req,res,error);
        }
    })
router.get("/getlist",
    async(req,res)=>{
        try {
            let listCategory = getData("LIST-CATEGORY");
            if(!listCategory){
                listCategory = await getListCategory();
                putData("LIST-CATEGORY",listCategory);
            }
            return responsHelper(req,res,null,listCategory);
        } catch (error) {
            console.log(error);
            return responsHelper(req,res,error);
        }
    })
export default router ;