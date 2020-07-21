require("dotenv").config();
import  express from 'express';
import  bodyParser from 'body-parser';
import  cros from 'cors';
import  responseTime from 'response-time';
import  logger from 'morgan';
import  mongoose from 'mongoose';
import router from './server/index';
import {responsHelper} from './common/responsiveHelper';
import authentication from './common/authentication';
import {FAIL_VALIDATION} from './constant/error';
mongoose.connect(`mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true},(error)=>{
if(error){
    console.log(error);
    console.log('Thất Bại');
}else {
    console.log('Connect successed to mongo');
}
});
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cros());
app.use(responseTime());
app.use(authentication);
app.use(logger("dev"));
app.set('trust proxy', true);
app.use("/",router);
app.use(function(err,req,res,next){
    if (err.message == 'validation error') {
        // ResponseHelper.json(req,res,err.errors,null);
        responsHelper(req, res,{
            ms:FAIL_VALIDATION,
            detail:err.errors
        }, null);
        return;
    }
})

app.listen(process.env.PORT||3000,function(){
    console.log("App Running On Port : " +process.env.PORT||3000 );
})
