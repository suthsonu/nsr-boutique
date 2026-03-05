const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/dresses', require('./src/routes/dresses'));
app.use('/api/gallery', require('./src/routes/gallery'));
app.use('/api/blogs', require('./src/routes/blogs'));
app.use('/api/reviews', require('./src/routes/reviews'));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
