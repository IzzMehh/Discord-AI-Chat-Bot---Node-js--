import mongoose from "mongoose";

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MONGO DB!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connect