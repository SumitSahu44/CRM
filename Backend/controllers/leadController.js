const db = require('../config/db'); // Ensure this is using mysql2 with promises

// Create a new lead
exports.createLead = async (req, res) => {
  try {
    const {
      leadId,         // LID
      date,           // Date
      source,         // Source
      businessName,   // BusinessName
      clientName,     // ClientName
      contactNumber,  // ContactNumber
      requirement,    // Requirement
      leadStatus,     // LeadStatus
      remark,         // Remark
      followupDate    // FollowUpDate
    } = req.body;
console.log("Received body:", req.body);

    // Required fields check
    if (!leadId || !date || !source || !businessName || !clientName) {
      return res.status(400).json({ message: 'Missing required fields: Lead ID, Date, Source, Business Name, Client Name' });
    }
console.log("Received body:", req.body);

    const insertQuery = `
      INSERT INTO leads 
      (LID, Date, Source, BusinessName, ClientName, ContactNumber, Requirement, LeadStatus, Remark, FollowUpDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      leadId,
      date,
      source,
      businessName,
      clientName,
      contactNumber || '',
      requirement || '',
      leadStatus || '',
      remark || '',
      followupDate || null
    ];

    await db.execute(insertQuery, values);

    res.status(201).json({ message: 'Lead inserted successfully' });

  } catch (error) {
    console.error('Error inserting lead:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.viewLead = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM leads ORDER BY LID DESC");

    res.status(200).json(rows); // Send all rows as JSON
  } catch (error) {
    console.error("Error fetching leads:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateLead = async (req, res) => {
  try {
    const {
      leadId,         // Make sure this matches frontend
      date,
      source,
      businessName,
      clientName,
      contactNumber,
      requirement,
      leadStatus,
      remark,
      followupDate
    } = req.body;

    // DEBUG: See what's coming in
    console.log("Update request body:", req.body);

    if (!leadId) {
      return res.status(400).json({ message: "Missing lead ID for update." });
    }

    const updateQuery = `
      UPDATE leads SET 
        Date = ?, 
        Source = ?, 
        BusinessName = ?, 
        ClientName = ?, 
        ContactNumber = ?, 
        Requirement = ?, 
        LeadStatus = ?, 
        Remark = ?, 
        FollowUpDate = ?
      WHERE LID = ?
    `;

    const values = [
      date || null,
      source || '',
      businessName || '',
      clientName || '',
      contactNumber || '',
      requirement || '',
      leadStatus || '',
      remark || '',
      followupDate || null,
      leadId  // ✅ Make sure this is defined
    ];

    await db.execute(updateQuery, values);
    res.status(200).json({ message: 'Lead updated successfully' });

  } catch (error) {
    console.error("Error updating lead:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




exports.deleteLead = async (req, res) => {
  try {
    const { lid } = req.params;

    const deleteQuery = `DELETE FROM leads WHERE LID = ?`;
    const [result] = await db.execute(deleteQuery, [lid]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lead not found or already deleted' });
    }

    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
