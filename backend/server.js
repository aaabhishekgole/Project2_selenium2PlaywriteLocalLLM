const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Handshake Endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', agent: 'Antigravity' });
});

// Conversion Endpoint
app.post('/api/convert', async (req, res) => {
    const { sourceCode } = req.body;
    console.log('Received conversion request...');

    if (!sourceCode) {
        return res.status(400).json({ error: 'Source code is required' });
    }

    const prompt = `
You are an expert Automation Engineer. Convert the following Java Selenium (TestNG) code into idiomatic Playwright TypeScript code.
Rules:
1. Use 'test' from '@playwright/test'.
2. Use 'await expect(...)' for assertions.
3. Use 'page.locator(...)' selectors.
4. Output ONLY the code. No markdown formatting, no explanations.

Java Code:
${sourceCode}
    `;

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: "deepseek-coder",
            prompt: prompt,
            stream: false
        });

        const rawOutput = response.data.response;
        // Basic cleanup if model adds markdown
        const cleanedOutput = rawOutput.replace(/```typescript/g, '').replace(/```/g, '').trim();

        res.json({
            convertedCode: cleanedOutput,
            status: 'SUCCESS'
        });

    } catch (error) {
        console.error('Ollama Error:', error.message);
        res.status(500).json({
            status: 'ERROR',
            errorLog: error.message || 'Failed to connect to Local LLM'
        });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
