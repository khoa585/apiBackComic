require("dotenv").config();
let mongoose = require("mongoose");
let {getListInLink,getDetialCommic} = require("./getCommic");
let kue = require('kue');
const redis = require("redis");
var Redis = require('ioredis');
const { get } = require("memory-cache");
const client = redis.createClient();
client.flushdb( function (err, succeeded) {
    console.log("Xóa Thành Công :" + succeeded); // will be true if successfull
});
let queue  = kue.createQueue({
    redis: {
        createClientFactory: function(){
            return new Redis();
        }
    },
});
mongoose.connect(`mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true},(error)=>{
if(error){
    console.log(error);
    console.log('Thất Bại');
}else {
    console.log('Connect successed to mongo');
}
});
// Get ALL Link In Chapter
// for (let i=1;i<=507;i++){
//     let job = queue.create("getLinkCommic",i).attempts(3).save(function(error) {
//         if (!error) console.log(job.id);
//         else console.log(error);
//     });
// }
// queue.process("getLinkCommic",2,function(job,done){
//     getListInLink(job.data).then((data)=>{
//         console.log("page"+job.data+ " : "+ data);
//         done()
//     })
//     .catch(error=>{
//         console.log(error);
//     })
// })
// END  Get ALL Link In Chapter

getDetialCommic("http://www.nettruyen.com/truyen-tranh/shirogane-no-ou-44");
