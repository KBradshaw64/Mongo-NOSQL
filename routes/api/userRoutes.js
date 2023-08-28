const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:user_Id').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:user_Id/friends/friends_Id').post(addFriend).delete(removeFriend);

module.exports = router;