import { Schema } from "mongoose";

const roomSchema = new Schema<TRoom>({
    name : {
        type : String,
        required : true
    },
    
})