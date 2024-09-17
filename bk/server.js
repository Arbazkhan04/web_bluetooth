const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Endpoint to generate the receipt data based on printer type
app.post('/generate-receipt', (req, res) => {
    const { receiptData, printerType } = req.body;
    
    let formattedReceipt = '';

    if (printerType === 'ESC/POS') {
        // ESC/POS initialization and text commands
        formattedReceipt = '\x1B\x40'; // ESC @ - Initialize printer
        formattedReceipt += receiptData; // Add receipt text
        formattedReceipt += '\n\x1D\x56\x41'; // ESC i - Cut paper
    } else {
        // Generic format (plain text)
        formattedReceipt = receiptData;
    }
    
    res.json({ receipt: formattedReceipt });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
