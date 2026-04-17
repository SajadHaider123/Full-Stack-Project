const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express());

app.get('/api/raw_call_logss', (req, res) => {
    res.json([
        {id: 1, phone: "03482311676"},
        {id: 2, phone: "03234567676"},

    ])
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
