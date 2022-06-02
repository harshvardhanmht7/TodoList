import mongoose from "mongoose";

const itemSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      }

},
{
    timestamps:true
}
)

 const Item=mongoose.model('Item',itemSchema);

 export default Item