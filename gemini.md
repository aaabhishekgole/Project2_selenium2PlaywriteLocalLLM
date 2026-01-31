# Project Constitution (Gemini)

## Data Schemas

### 1. Conversion Payload (Core IO)
This schema governs the data flow between the UI and the Converter Engine.

```json
{
  "ConversionRequest": {
    "sourceCode": "string (Java Source)",
    "targetLanguage": "string (JavaScript | TypeScript)",
    "outputFileName": "string (optional, e.g. LoginTest.spec.ts)"
  },
  "ConversionResponse": {
    "convertedCode": "string (Playwright Source)",
    "status": "string (SUCCESS | ERROR)",
    "errorLog": "string (if status == ERROR)",
    "savedPath": "string (absolute path of saved file)"
  }
}
```

## Behavioral Rules
1. **Readability First**: Generated Playwright code should look idiomatic (e.g., use `await expect()`, not strict Java translation).
2. **UI Centric**: The primary interface is the Web UI. CLI is secondary/internal.
3. **Safety**: Do not overwrite existing files without explicit confirmation (or use unique names).
4. **TestNG Mapping**:
    - `@Test` -> `test('name', async ({ page }) => { ... })`
    - `@BeforeClass/Method` -> `test.beforeAll / test.beforeEach`
    - `Assert.assertEquals` -> `expect(val).toBe(expected)`

## Architectural Invariants
- **Layer 1**: Architecture (`architecture/`) - SOPs
- **Layer 2**: Navigation - Agent reasoning
- **Layer 3**: Tools (`tools/`) - Deterministic scripts
- **Frontend**: Vite + React (Premium Design)
- **Backend/Logic**: Local Node.js or Python scripts invoked by the App.
- **AI Engine**: Ollama API (Model: `codellama`) running locally.
- **Self-Healing**: Analyze -> Patch -> Test -> Update Architecture
- **Data-First**: Define Schema before coding.

