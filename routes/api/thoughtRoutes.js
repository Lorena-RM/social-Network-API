const router = require("express").Router();

const {
    getThoughts,
    createThought,
    singleThought,
    updateThought,
} = require('../../controllers/thoughtControllers');

//currently at /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(singleThought).put(updateThought)

module.exports = router;