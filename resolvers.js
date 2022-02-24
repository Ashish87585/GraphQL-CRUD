const Post = require('./models/Post.model')
const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World'
        },

        getAllPost: async () => {
            return await Post.find();
        },

        getPost: async (_paren, {id}, _context, _info) => {
            return await Post.findById(id)
        }
     },

    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post
            return await Post.create({
                title,
                description
            })
        },

        deletePost: async (parent, {id}, context, info) => {
            await Post.findByIdAndDelete(id)
            return "Ok, Post deleted successfully..!!"
        },

        updatePost: async (parent, args, context, info) => {
            const { id } = args
            const { title, description } = args.post
            const post = await Post.findByIdAndUpdate(id, { title, description }, { new: true })
            return post
        }
    }
}

module.exports = resolvers;