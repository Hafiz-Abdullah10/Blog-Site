import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log("Database is connected")
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/hafizabdullah507`)
    } catch (error) {

        console.log(error.message);
    }

}

export default connectDB;