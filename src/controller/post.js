const Post = require('../model/post')
const { ObjectID } = require("mongodb")

let postController = {}

postController.insert = async (data) => {
    const posts = await Post.insertMany(data)
    return posts
}

postController.getByFilter = async (filter = {}, projection = {}) => {
    const posts = await Post.find(filter, projection)
    return posts
}

postController.getById = async (id, projection = {}) => {
    const post = await getByFilter({ _id: ObjectID(id) }, projection)
    return post
}

postController.updateByFilter = async (filter, dataUpdate) => {
    await Post.updateMany(filter, dataUpdate)
    return true
}

postController.updateById = async (id, dataUpdate) => {
    await updateByFilter({ _id: id }, dataUpdate)
    return true
}

postController.deleteByFilter = async (filter) => {
    await Post.delete(filter)
    return true
}

postController.deleteById = async (id) => {
    await deleteByFilter({ _id: id })
    return true
}

module.exports = postController