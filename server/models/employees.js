const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeesSchema = new Schema(
    {
        firstname: { type: String, required: true, maxlength: 50 },
        lastname: { type: String, required: true, maxlength: 50 },
        department: { type: String, required: true },
        startdate: { type: String, required: true },
        salary: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now() },
    }
);
//Export model
module.exports = mongoose.model('Employee', EmployeesSchema);