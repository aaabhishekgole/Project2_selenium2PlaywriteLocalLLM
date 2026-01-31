# SOP: Selenium to Playwright Conversion Engine

## 1. Objective
Convert Java Selenium code (TestNG/JUnit) into idiomatic Playwright TypeScript code using a Local LLM (Ollama/CodeLlama).

## 2. Architecture Layer
- **Layer 1 (SOP):** This file.
- **Layer 2 (Navigation):** `server.js` (Express Routes).
- **Layer 3 (Tools):** `tools/ollama_client.js` (to be created, or inline in server for now).

## 3. Input/Output Contract
**Input:**
- `sourceCode`: Raw string of Java code.
- `targetLanguage`: "typescript" (default).

**Output:**
- `convertedCode`: Clean Playwright code.
- `status`: "SUCCESS" or "ERROR".

## 4. Logical Flow
1.  **Validation**: Ensure `sourceCode` is not empty.
2.  **Prompt Engineering**:
    - Role: "Expert Automation Engineer".
    - Task: "Refactor this Java Selenium code to Playwright TypeScript".
    - Constraint: "Use `await expect(...)` for assertions."
    - Constraint: "Use `page.locator(...)` instead of `driver.findElement`."
    - Constraint: "Preserve logic, ignore imports."
    - Constraint: "Output ONLY the code, no markdown, no explanation."
3.  **LLM Invocation**:
    - URL: `http://localhost:11434/api/generate`
    - Model: `codellama`
    - Stream: `false` (for simplicity in v1)
4.  **Post-Processing**:
    - Strip "```typescript" and "```" if present.
    - Trim whitespace.
5.  **Response**: Return JSON.

## 5. Error Handling
- If Ollama is down: Return 503 Service Unavailable.
- If Prompt fails: Return 500.
