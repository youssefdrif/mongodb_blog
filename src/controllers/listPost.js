const modelBlog = require("../models/model-blog");

module.exports = async(req, res) => {
    const blogposts = await modelBlog.find({}).populate('userid');
    console.log(blogposts);
    res.render('list', {
        blogposts
    });
}


