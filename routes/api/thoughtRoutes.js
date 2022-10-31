const router = require("express").Router();

const {
    getThoughts,
    createThought,
    singleThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers');

//currently at /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought)

module.exports = router;