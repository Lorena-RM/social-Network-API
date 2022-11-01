const {User, Thought} = require("../models");

module.exports = {
  //getiing ALL users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //getting SINGLE user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //CREATING a user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  //UPDATING user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      );
  },
  //DELETING user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => 
    !user
    ? res.status(404).json({ message: "No user with this id!" })
    : Thought.deleteMany({_id: {$in: user.thoughts}})
    )
    .then(() => res.json({message: "User and their thoughts have been Deleted!"}))
    .catch((err) => res.status(500).json(err));
  },
  //ADDING a friend by ID
  addFriend(req, res) {
    console.log('You are adding a friend :)');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user and/or friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Deleting a friend by ID
  removefriend(req, res) {
    console.log('you are removing a friend :)')
    User.findOneAndUpdate(
      { _id: req.params.userId},
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user and/or friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
