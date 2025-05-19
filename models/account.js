import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id_ebay: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true,
    }
}, { timeStamps: true });

const Account = mongoose.model("Account", accountSchema);
export default Account;