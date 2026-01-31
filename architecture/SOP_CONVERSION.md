# SOP: Conversion Logic (Layer 1)

## Goal
Convert incoming Selenium Java code to Playwright TypeScript using a local LLM (Ollama).

## Flow
1. **Input Reception**: `converter.py` receives `sourceFile` path.
2. **Read**: Script reads the raw text of the `.java` file.
3. **Prompt Construction**:
    - Role: "Expert Automation Engineer"
    - Task: Convert Java Selenium to Playwright TS.
    - Context: TestNG annotations mapping scheme.
    - Input: The raw Java code.
4. **LLM Invocation (Ollama)**:
    - Endpoint: `http://localhost:11434/api/generate`
    - Model: `codellama`
    - Json Mode: `false` (We want code blocks, but we can parse them).
5. **Output Extraction**:
    - Regex extract code between ```typescript ... ``` blocks.
6. **Save**: Write to `outputFile`.

## Error Handling
- If Ollama is down -> Return "LLM Connection Error".
- If Output is empty -> Retry once.
