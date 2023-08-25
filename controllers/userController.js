// need to edit to fit my naming conventions

module.exports = {
    // Get all students
    async getStudents(req, res) {
      try {
        const students = await Student.find();
  
        const studentObj = {
          students,
        };
  
        res.json(studentObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single student
    async getSingleStudent(req, res) {
      try {
        const student = await Student.findOne({ _id: req.params.studentId })
          .select('-__v');
  
        if (!student) {
          return res.status(404).json({ message: 'No student with that ID' })
        }
  
        res.json({
          student,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new student
    async createStudent(req, res) {
      try {
        const student = await Student.create(req.body);
        res.json(student);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a student and remove them from the course
    async deleteStudent(req, res) {
      try {
        const student = await Student.findOneAndRemove({ _id: req.params.studentId });
  
        if (!student) {
          return res.status(404).json({ message: 'No such student exists' });
        }

        res.json({ message: 'Student successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    // change to add friends
    async addAssignment(req, res) {
      console.log('You are adding an assignment');
      console.log(req.body);
  
      try {
        const student = await Student.findOneAndUpdate(
          { _id: req.params.studentId },
          { $addToSet: { assignments: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!student) {
          return res
            .status(404)
            .json({ message: 'No student found with that ID :(' });
        }
  
        res.json(student);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove assignment from a student
    async removeAssignment(req, res) {
      try {
        const student = await Student.findOneAndUpdate(
          { _id: req.params.studentId },
          { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
          { runValidators: true, new: true }
        );
  
        if (!student) {
          return res
            .status(404)
            .json({ message: 'No student found with that ID :(' });
        }
  
        res.json(student);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };