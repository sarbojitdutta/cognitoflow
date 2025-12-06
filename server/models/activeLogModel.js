import mongoose from 'mongoose'

const activeSchema = new mongoose.Schema({
    actorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Codefile'
    },
    projectId: {
        type: String
    },
    actionType: {
        type: String
    },
    description: {
        type: String
    },
    details: {
        type: Object
    },
    timestamp: {
        type: Date,
        default: Date.now
    }


})

const ActiveLog = mongoose.model('ActiveLog', activeSchema)
export default ActiveLog