@echo off
echo Starting Selenium 2 Playwright Converter...

:: Start Backend
start "Backend (Port 3001)" /d "backend" cmd /k "node server.js"

:: Start Frontend
start "Frontend (Port 5173)" /d "frontend" cmd /k "npm run dev"

echo Waiting for services to initialize...
timeout /t 5

:: Open Browser
start http://localhost:5173

echo System is running!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
pause
