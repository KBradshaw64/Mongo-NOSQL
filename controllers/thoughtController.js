// when creating a thought - need to grab username(req.body.username) and lookup user to push thought._id to their 'thoughts' array
//when deleting  - create const thought = await Thought.findoneanddelete   grab username off the thought.username and pull from users 'thoughts' array

const { Thought, Reaction, User } = require('../models');

module.exports = {
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.Thought_Id })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID'});
            }

            res.json(thought);
        } catch (err){
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const user = await user.findOneAndUpdate(
                { _id: req.params.user_Id },
                { $addToSet: { thoughts: req.body } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({message: 'Could not find user this thought belongs to.'})
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    
}