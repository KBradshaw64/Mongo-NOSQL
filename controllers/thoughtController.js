// when creating a thought - need to grab username(req.body.username) and lookup user to push thought._id to their 'thoughts' array
//when deleting  - create const thought = await Thought.findoneanddelete   grab username off the thought.username and pull from users 'thoughts' array

const { Thought, Reaction, User } = require('../models');

module.exports = {
    //find all thoughts
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //find a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thought_Id })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Could not find user this thought belongs to.' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thought_Id },
                { $set: { thoughtText: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Could not find a thought with this Id' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thought_Id });
            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            };
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.thought_Id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            };
            res.json({ message: 'Thought successfully deleted.' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thought_Id },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({message: 'no thought with that ID'});
            };
            res.json(thought)
        } catch (err){
            res.status(500).json(err);
            console.log(err);
        }
    },
    //delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thought_Id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({message: 'No thought found with this Id'})
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
}