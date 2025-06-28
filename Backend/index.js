const express = require('express');
const cors = require('cors');
const app = express();
const leadRoutes = require('./routes/leadRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', leadRoutes); // <-- leads is nested under /api


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
