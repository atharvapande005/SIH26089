const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// REST API endpoint: GET /api/stats
app.get('/api/stats', (req, res) => {
  res.json({
    registeredSocieties: 48000,
    verifiedWorkers: 620000,
    directPayoutPercent: 93
  });
});

app.listen(PORT, () => {
  console.log(`SahakarSetu API Server running at http://localhost:${PORT}`);
});
