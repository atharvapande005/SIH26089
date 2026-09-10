export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.status(200).json({
    registeredSocieties: 48000,
    verifiedWorkers: 620000,
    directPayoutPercent: 93
  });
}