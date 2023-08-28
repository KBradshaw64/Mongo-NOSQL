const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router.route('/:thought_Id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thought_Id/reactions').post(createReaction);

router.route('/:thought_Id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;