const { response } = require("express");
const { User, Thought } = require("../models");

module.exports = {
  //getting ALL thoughts
  getThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  singleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate('reactions')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // CREATING a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message:
                "No user found with that username :(, your thought was still created ",
            })
          : res.json("Thought created! :)")
      )
      .catch((err) => res.status(500).json(err));
  },
  //UPDATING thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: thought._id } }
        );
      })
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //ADDING reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  //DELETING a reaction
  deleteReaction(req, res) {
    console.log("you are removing a reaction :)");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      //equivalent to {new: true}
      { returnOriginal: false }
    ).then((reaction) =>
      !reaction
        ? res
            .status(404)
            .json({ message: "No thought and/or reaction with this id!" })
        : res.json(reaction)
    );
  },
};
