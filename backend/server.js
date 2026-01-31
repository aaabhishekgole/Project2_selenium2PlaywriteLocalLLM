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
You are a strict code converter.
Task: Convert Java Selenium code to Playwright TypeScript.
Input:
${sourceCode}

Instructions:
1. ONLY return the TypeScript code.
2. Do NOT include explanations, "Sure", or "Here is the code".
3. Wrap result in \`\`\`typescript blocks.
    `;

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: "deepseek-coder",
            prompt: prompt,
            stream: false
        });

        let converted = response.data.response;

        // Extract code block if present
        const codeBlockRegex = /```(?:typescript|ts)?\s*([\s\S]*?)\s*```/;
        const match = converted.match(codeBlockRegex);

        if (match && match[1]) {
            converted = match[1];
        } else {
            // Fallback cleanup
            converted = converted.replace(/```/g, '').trim();
        }

        res.json({
            convertedCode: converted,
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
