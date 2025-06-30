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