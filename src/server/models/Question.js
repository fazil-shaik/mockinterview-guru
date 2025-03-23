
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  timeLimit: {
    type: Number,
    default: 30
  },
  exampleInput: {
    type: String
  },
  exampleOutput: {
    type: String
  },
  codeTemplate: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
