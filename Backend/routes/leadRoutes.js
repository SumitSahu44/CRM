const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/leads', leadController.createLead); // final route: /api/leads
router.get('/leads', leadController.viewLead); 
router.put('/leads/:lidleadController', leadController.updateLead); // final: /api/leads/:lid
router.delete('/leads/:lid', leadController.deleteLead); // final: /api/leads/:lid


module.exports = router;
