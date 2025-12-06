import mongoose from 'mongoose'

const cmtSchema = new mongoose.Schema({
    codeFileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'CodeFile'
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    anchor: {
        lineStart: { type: Number, required: true },
        charStart: { type: Number, required: true },
        contentSnippet: String, // For re-anchoring
    },
    
    replies: {
        type: [ReplySchema],
        default: []
    }
    


})

const ReplySchema = new mongoose.Schema({
    // MongoDB will automatically assign a unique _id to each embedded reply
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // This option ensures MongoDB assigns an _id to the sub-document
    _id: true 
});


const Comment = mongoose.model('Comment', cmtSchema)
export default Comment