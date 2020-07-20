let mongoose = require("mongoose");
let Schema = mongoose.Schema ;
let commic = new Schema({
    url:String,
    name:String ,
    alternative:String,
    authors:[
        {
            type:String
        }
    ],
    image:{
        type:String
    },
    status:String,
    views:Number,
    genres:[
        {
            type:String
        }
    ],
    description:String,
    chapters:[
        {
            type:Schema.Types.ObjectId,
            ref:'chapter'
        }
    ],
    enable:{
        type:Boolean,
        default:true
    }
},
{timestamps:true}
)
module.exports = mongoose.model("commic",commic);