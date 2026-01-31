# 📘 Selenium 2 Playwright Converter - User Guide

This tool uses **Local AI (DeepSeek/CodeLlama)** to convert legacy Selenium Java code into modern Playwright TypeScript code.

## 🚀 Quick Start

### Prerequisites
1.  **Node.js**: Installed on your machine.
2.  **Ollama**: Installed and running (`ollama serve`).
3.  **Model**: `deepseek-coder` or `codellama` pulled (`ollama pull deepseek-coder`).

### Running the App
Double-click **`start_app.bat`** in the root directory.
*   This opens the Backend (Port 3001), Frontend (Port 5173), and the Browser.

---

## 🛠 Features

### 1. AI Conversion Engine
*   **Input**: Paste your Java Class/Method.
*   **Process**: The system strips imports, analyzes logic, and rewrites it using Playwright syntax (`page.locator`, `await expect`).
*   **Output**: Clean TypeScript code ready to paste into your VS Code.

### 2. Status Indicators
*   **Online**: Backend is connected and AI is ready.
*   **Offline**: Backend is down or LLM is not responding.

### 3. Safety & Privacy
*   **Local Only**: Your code **never** leaves your machine. It is processed by your local Ollama instance.

---

## 🔧 Troubleshooting

**"System Offline" / "Error 500"**
1.  Ensure **Ollama** is running. Open a terminal and type `ollama list`.
2.  Check the Backend terminal window for errors.

**"Model Not Found"**
1.  The system defaults to `deepseek-coder`.
2.  Run `ollama pull deepseek-coder` to install it.

## 📂 Project Structure
*   `frontend/`: React + Vite (The UI).
*   `backend/`: Express.js (The API).
*   `architecture/`: System SOPs.
*   `tools/`: Helper scripts.
