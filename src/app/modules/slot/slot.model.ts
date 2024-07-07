import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>({
    room : {
        type : Schema.Types.ObjectId,
        ref : 'rooms'
    },
    date : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    },
    isBooked : {
        type : Boolean,
    }
})

slotSchema.pre('save', async function(next){
    this.isBooked = false
    next()
})

slotSchema.pre('save', async function(next){
    const startTimeH = Number(this.startTime.split(':')[0])
    const endTimeH = Number(this.endTime.split(':')[0])
    const startTimeM = Number(this.startTime.split(':')[1])
    const endTimeM = Number(this.endTime.split(':')[1])
    const duration = (endTimeH - startTimeH) * 60 + (endTimeM - startTimeM)
    const slotQuantity = Math.floor(duration/60)
    const valuestart = this.startTime
        const valuestop = this.endTime

             //create date format       
        const timeStart = new Date("01/01/2007 " + valuestart);
        const timeEnd = new Date("01/01/2007 " + valuestop);

        const difference = (timeEnd - timeStart);            
        const diff_result = new Date(difference);    

        const hourDiff = diff_result.getHours();
    console.log(hourDiff);
    next()

})

export const SlotModel = model<TSlot>('slots', slotSchema)