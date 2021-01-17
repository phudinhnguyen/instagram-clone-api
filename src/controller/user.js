const User = require('../model/user')
const { ObjectID } = require("mongodb")

let userController = {}

userController.insert = async (data) => {
    const users = await User.insertMany(data)
    return users
}

userController.getByFilter = async (filter = {}, projection = {}) => {
    const users = await User.find(filter, projection)
    return users
}

userController.getById = async (id, projection = {}) => {
    const user = await userController.getByFilter({ _id: ObjectID(id) }, projection)
    return user
}

userController.updateByFilter = async (filter, dataUpdate) => {
    await User.updateMany(filter, dataUpdate)
    return true
}

userController.updateById = async (id, dataUpdate) => {
    await userController.updateByFilter({ _id: ObjectID(id) }, dataUpdate)
    return true
}

userController.deleteByFilter = async (filter) => {
    await User.delete(filter)
    return true
}

userController.deleteById = async (id) => {
    await deleteByFilter({ _id: id })
    return true
}

userController.getFollowing = async (userId) => {
    const [following] = await User.aggregate([
        {
            $match: { _id: ObjectID(userId) }
        },
        {
            $lookup: {
                from: "users",
                let: { following: "$following" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $in: ["$_id", "$$following"]
                            }
                        }
                    },
                    {
                        $project: { following: 0 }
                    }
                ],
                as: "following",
            }
        },
    ]);

    return following && following.following;
}

userController.getFollowers = async (userId) => {
    const followings = await User.aggregate([
        {
            $match: {
                following: {
                    $elemMatch: {
                        $eq: ObjectID(userId)
                    }
                }
            }
        },
        {
            $project: { following: 0, password: 0 }
        }
    ])
    return followings
}

module.exports = userController