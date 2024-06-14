const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = async (req, res) => {
    const { username, password } = req.body;
    console.log(`if username, password ${username} ${password}`);
    const userFind = await User.findOne({username: username})
    if (userFind) {
        const same = await bcrypt.compare(password, userFind.password) 
        if (same) {
            console.log(`if same ${same}`);
            req.session.userId = userFind._id
            console.dir(req.session)
            res.redirect('/index')  //if passwords match
        }
        else {
            res.redirect('/auth/login')
        }
    }
    else {
        res.redirect('/auth/login')
    }
}