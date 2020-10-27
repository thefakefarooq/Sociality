const post = require('../../models/post');

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await post.find();
                return posts;
            }
            catch(err){
                throw new Error(err);
            }
        }
    }
}