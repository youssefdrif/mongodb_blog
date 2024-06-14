const { default: mongoose } = require("mongoose");
const modelBlog = require("./src/models/model-blog");

async function main() {
    const id = "666978e825e33b31259b382a";

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/my_blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongoose connected to the database.");

        // trouver tout les posts
        const blogs = await modelBlog.find({});
        console.log("Found blog posts:", blogs);

        // Update un post par son id
        const updateResult = await modelBlog.findByIdAndUpdate(id, {
            title: 'Updated title'
        }, { new: true }); // return du document mis à jour
        console.log("Post mis à jour:", updateResult);

         // Supprimer un post par son id
        //const deleteResult = await modelBlog.findByIdAndDelete(id);
        //console.log("Post supprimé:", deleteResult);
        

    } catch (error) {
        console.error("Erreur:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Deconnection de mongoose dans la bdd.");
    }
}

main().then(() => {
    console.log("Success.");
}).catch(console.error);
