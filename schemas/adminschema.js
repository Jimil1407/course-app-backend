import mongoose from 'mongoose';

const admins = new mongoose.Schema({
    
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

export default admins;