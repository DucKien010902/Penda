import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
    },
    email: {
        type: String,
        strim: true,
    },
    title: {
        type: String,
        strim: true,
    },
    content: {
        type: String,
        strim: true,
    }
}, { timeStamps: true });

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;