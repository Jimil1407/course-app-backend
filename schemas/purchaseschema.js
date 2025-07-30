import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    
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

const purchases = mongoose.model('Purchase', purchaseSchema);

export default purchases;