import mongoose from "mongoose";

const guildSchema = new mongoose.Schema({
    guildName:{
        type:String,
        required:true,
    },
    guildId:{
        type:String,
        required:true,
    },
    channelId:{
        type:String,
        reqired:true,
    },
},
{
    timestamps:true
})  

export const Guild = mongoose.model("Guild", guildSchema) 