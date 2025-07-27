import mongoose from 'mongoose';

const purchases = new mongoose.Schema({
    
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        require: true
    },
        
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
    
});

export default purchases;