const modelBlog = require("../models/model-blog");

const getAllBlogPosts = async (req, res) => {
  const blogposts = await modelBlog.find();
  res.render("post", {
    blogposts,
  });
};

const getBlogPostById = async (req, res) => {
  try {
    console.log(`req params = ${req.params.id}`);
    const blogpost = await modelBlog.findById(req.params.id).populate('userid');
    console.log(
      `req params = ${req.params.id} blogpost is => ${JSON.stringify(blogpost)}`
    );
    console.log("blogpost " + blogpost + " id= " + req.params.id);
    res.render("post", {
        blogpost,
      });
} catch (error) {
    console.log(error);
    return;
  }
 
};

module.exports = { getAllBlogPosts, getBlogPostById };
