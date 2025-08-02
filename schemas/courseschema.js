import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        require: true
    }
    
})

const courses = mongoose.model('Course', courseSchema);

export default courses;