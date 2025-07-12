const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT;
const TIKTOK_USERNAME = 'k3noxfn'; // שנה כאן לשם המשתמש שלך
const TIKTOK_LIVE_URL = `https://www.tiktok.com/@${TIKTOK_USERNAME}/live`;

// דף הבית
app.get('/', (req, res) => {
  res.send('👋 השרת באוויר! כדי לבדוק אם אתה בלייב גש ל: /is-live');
});

// בדיקה אם בלייב
app.get('/is-live', async (req, res) => {
  try {
    const response = await axios.get(TIKTOK_LIVE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const isLive = response.data.includes('LIVE');
    res.json({ live: isLive });
  } catch (error) {
    console.error('שגיאה בבדיקה:', error.message);
    res.json({ live: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
