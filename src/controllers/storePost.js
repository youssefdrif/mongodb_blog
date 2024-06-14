const modelBlog = require("../models/model-blog");
const path = require('path');

module.exports = async (req, res) => {
    
    let image = req.files.image;    
    image.mv(path.resolve(__dirname, '../../public/assets/img', image.name), async (error) => {
        if (error) {
            console.log(`Erreur lors du traitement de l'image: ${error}`);
            return res.status(500).send(error);
        } else {
            try {
                await modelBlog.create({
                    ...req.body, 
                    image: '/assets/img/' + image.name,
                    userid: req.session.userId
                });
                res.redirect('/list');
            } catch (error) {
                console.log(`Erreur d'insertion: ${error}`);
            }
        }
    });
}