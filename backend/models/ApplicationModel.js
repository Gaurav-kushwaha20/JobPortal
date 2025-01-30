const mongoose = require("mongoose");
const ApplicationSchema = new mongoose.Schema({
    jobSeekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vacancyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy' },
    status: { type: String, enum: ['applied', 'shortlisted', 'rejected'], default: 'applied' },
    appliedAt: { type: Date, default: Date.now },
}, {timestamps: true});

module.exports.ApplicationSchema = mongoose.model('Application', ApplicationSchema);