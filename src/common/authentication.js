require('dotenv').config();
const md5 = require('md5');
import {responsHelper} from './responsiveHelper';
import {AUTHEN_FAIL ,ERROR_AUTHEN ,FAIL_VALIDATION} from '../constant/error';
const TIME_EXPRIED=1000*60*60 ;
function authentication(req,res,next){
    let {unittime,token,admin} = req.headers ;
    // console.log(process.env.SECRET_KEY ,TIME_EXPRIED);
    if(admin=='ADMIN'){
        return next();
    }
    if(!unittime || !token){
        return responsHelper(req,res,ERROR_AUTHEN);
    }
    if( Math.abs( Date.now() - unittime) > TIME_EXPRIED ){;
        return responsHelper(req,res,AUTHEN_FAIL);
    }
    let rescret = md5(unittime+process.env.SECRET_KEY);
    if(rescret !=token){
        return responsHelper(req,res,AUTHEN_FAIL);
    }
    next();
}
export default authentication ;