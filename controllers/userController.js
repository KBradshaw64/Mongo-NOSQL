// need to edit to fit my naming conventions
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models/index');

module.exports = {
    // Get all students
    async getUsers(req, res) {
      try {
        const users = await User.find();
  
        const userObj = {
          users,
        };
  
        res.json(userObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user -- check to see if user_Id is correct
    async getSingleUser(req, res) {
      try {
        const user = await user.findOne({ _id: req.params.user_Id })
        //not sure I understand the meaning or use for tracking revisions of a document
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json({
          user,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndRemove({ _id: req.params.user_Id });
  
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }

        res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    //update a user
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.user_Id },
          { username: req.body.username },
          { email: req.body.email },
          );
          if (!user) {
            return res.status(404).json({message: 'No user found.'})
          }
          res.json(user);
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    },
    // change to add friends
    async addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
  
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.user_Id },
          { $addToSet: { assignments: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID :(' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove friend from a user
    //not sure about the line 94 $pull for the friend ID
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.user_Id },
          { $pull: { friends: { friends_Id: req.params.friends_Id } } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID :(' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };