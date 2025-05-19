import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const salarySchema = mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
}, { timeStamps: true });

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;