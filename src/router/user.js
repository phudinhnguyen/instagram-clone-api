const userController = require("../controller/user");
const { pipe } = require("../helper/server");
const router = require("express").Router();

router.get('/:userId',
    pipe(
        (req) => [req.params.userId, { following: 0 }],
        userController.getById,
        { end: true }
    )
)

router.put('/:userId',
    pipe(
        (req) => [req.params.userId, req.body],
        userController.updateById,
        { end: true }
    )
)

router.get('/:userId/followings',
    pipe(
        (req) => [req.params.userId],
        userController.getFollowing,
        { end: true }
    )
)

router.get('/:userId/followers',
    pipe(
        (req) => [req.params.userId],
        userController.getFollowers,
        { end: true }
    )
)

module.exports = {
    router,
    config: {
        noAuth: {}
    }
}
