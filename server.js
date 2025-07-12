const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 10000;

// החלף את שם המשתמש שלך בטיקטוק כאן
const TIKTOK_USERNAME = 'lookatsnoke';
const TIKTOK_LIVE_URL = `https://www.tiktok.com/@${TIKTOK_USERNAME}/live`;

// הפעלת CORS
app.use(cors());

// דף ברירת מחדל – שלא תראה "Not Found"
app.get('/', (req, res) => {
  res.send('👋 השרת פועל! כדי לבדוק סטטוס לייב גש ל: /is-live');
});

// בדיקת לייב
app.get('/is-live', async (req, res) => {
  try {
    const response = await axios.get(TIKTOK_LIVE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const isLive = response.data.includes('liveRoomId') || response.data.includes('isLive":true');
    res.json({ live: isLive });
  } catch (error) {
    console.error('שגיאה בבדיקה:', error.message);
    res.json({ live: false });
  }
});

// התחלת שרת
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
