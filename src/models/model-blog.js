const { default: mongoose } = require("mongoose");

const blogPostSchema = mongoose.Schema({
    title: {
        type:String,
        trim: true,
        minlength:10,
        maxlength:100,
        required: [true, 'title is required'],
    },
    description: { 
        type:String,
        required: [true, 'description is required'],
    },
    //username: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
})

//methods

blogPostSchema.methods.findCatSame = function () {
    return mongoose.model('blog').find({
        category: {$in:this.category}
    })
}

const modelBlog = mongoose.model('blog', blogPostSchema)

module.exports = modelBlog