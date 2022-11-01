const router = require("express").Router();

const {
    getThoughts,
    createThought,
    singleThought,
    updateThought,
    deleteThought,
    addReaction,
} = require('../../controllers/thoughtControllers');

//currently at /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction)

module.exports = router;