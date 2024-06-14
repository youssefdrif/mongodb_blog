const validateMiddleWare = (req, res, next) => {
    if(req.files == null || req.body.title == null || req.body.description == null) {
        //return res.redirect('/index')
        return res.redirect('/post/new')
    }
    next()
}

module.exports = validateMiddleWare;