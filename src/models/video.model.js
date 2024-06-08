import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:{
            type : String,
            required:true
        },
        thumbnail:{
            type : String,  //cloudinary url
            required:true
        },
        title:{
            type: String,
            required:true
        },
        decription:{
            typr:String,
            required:true
        },
        duration:{
            type :Number,
            required:true
        },
        views:{
            type:Number,
            required:true
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("Video",videoSchema)