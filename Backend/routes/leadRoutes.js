const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/leads', leadController.createLead); // final route: /api/leads
router.get('/leads', leadController.viewLead); 

module.exports = router;
