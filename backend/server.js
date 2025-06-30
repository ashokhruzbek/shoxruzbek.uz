const express = require('express');
const cors = require('cors');
const adminRouter = require('./routes/adminRouter');
const app = express();

app.use(cors());
app.use(express.json());




app.use('/admin', adminRouter)


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Gitgitton ${port} - portda ishlayapti...`);
});

