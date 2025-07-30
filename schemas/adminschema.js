import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    
})

const admins = mongoose.model('Admin', adminSchema);

export default admins;