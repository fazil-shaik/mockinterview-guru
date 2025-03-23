
const express = require('express');
const Submission = require('../models/Submission');
const codeExecutionService = require('../services/codeExecutionService');
const aiReviewService = require('../services/aiReviewService');
const router = express.Router();

// Get all submissions for a question
router.get('/question/:questionId', async (req, res) => {
  try {
    const submissions = await Submission.find({ 
      questionId: req.params.questionId 
    }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit code for execution and review
router.post('/', async (req, res) => {
  try {
    const { questionId, userId, code, language } = req.body;
    
    // Create a new submission
    const submission = new Submission({
      questionId,
      userId,
      code,
      language,
      status: 'Pending'
    });
    
    // Save the initial submission
    let newSubmission = await submission.save();
    
    // Execute code
    const executionResult = await codeExecutionService.executeCode(code, language);
    
    // Update with execution results
    newSubmission.result = executionResult;
    newSubmission.status = 'Submitted';
    await newSubmission.save();
    
    console.log(`Submission saved with ID: ${newSubmission._id}`);
    
    // Get AI review asynchronously
    aiReviewService.getCodeReview(code, language)
      .then(async (review) => {
        console.log(`AI review received for submission ${newSubmission._id}`);
        // Update the submission with the AI review
        await Submission.findByIdAndUpdate(
          newSubmission._id,
          { 
            aiReview: review,
            status: 'Evaluated'
          }
        );
        console.log(`Submission ${newSubmission._id} updated with AI review`);
      })
      .catch(err => console.error('Error getting AI review:', err));
    
    res.status(201).json(newSubmission);
  } catch (err) {
    console.error('Error in submission route:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get submission by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching submission with ID: ${req.params.id}`);
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      console.log(`Submission with ID ${req.params.id} not found`);
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    console.log(`Submission found: ${submission.status}`);
    res.json(submission);
  } catch (err) {
    console.error(`Error fetching submission ${req.params.id}:`, err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
