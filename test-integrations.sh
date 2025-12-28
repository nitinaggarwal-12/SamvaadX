#!/bin/bash

# 🧪 Quick Social Media Integration Test Script
# This script starts all services and opens the testing page

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  🧪 SOCIAL MEDIA INTEGRATION TEST                           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the guddu-project root directory"
    exit 1
fi

# 1. Start Backend
echo "🚀 Starting Backend Server..."
cd backend
npm run start:dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "   ✅ Backend PID: $BACKEND_PID"

# 2. Wait for backend to initialize
echo "⏳ Waiting for backend to start..."
sleep 8

# 3. Check backend health
echo "🔍 Checking backend health..."
HEALTH_CHECK=$(curl -s http://localhost:3000/health || echo "failed")
if [[ $HEALTH_CHECK == *"ok"* ]] || [[ $HEALTH_CHECK != "failed" ]]; then
    echo "   ✅ Backend is ready!"
else
    echo "   ⚠️  Backend might still be starting... (check backend.log)"
fi

# 4. Start Frontend
cd ../frontend
echo ""
echo "🎨 Starting Frontend Server..."
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   ✅ Frontend PID: $FRONTEND_PID"

# 5. Wait for frontend
echo "⏳ Waiting for frontend to start..."
sleep 8

# 6. Display info
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  ✅ ALL SERVICES RUNNING!                                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 URLs:"
echo "   Frontend:    http://localhost:3001"
echo "   Backend:     http://localhost:3000"
echo "   Connections: http://localhost:3001/connections"
echo ""
echo "🧪 TESTING OPTIONS:"
echo ""
echo "   OPTION 1: Mock Testing (No setup needed)"
echo "   ├─ Go to: http://localhost:3001/connections"
echo "   ├─ Click any 'Connect' button"
echo "   └─ See OAuth simulation"
echo ""
echo "   OPTION 2: Real OAuth Testing"
echo "   ├─ Set up OAuth apps (see SOCIAL_MEDIA_TESTING_GUIDE.md)"
echo "   ├─ Add credentials to backend/.env"
echo "   ├─ Restart backend: kill $BACKEND_PID && cd backend && npm run start:dev"
echo "   └─ Test real connections"
echo ""
echo "📊 Process IDs:"
echo "   Backend:  $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop all services:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""

# 7. Open browser
echo "🌐 Opening browser in 3 seconds..."
sleep 3
open http://localhost:3001/connections 2>/dev/null || \
xdg-open http://localhost:3001/connections 2>/dev/null || \
echo "   Please open: http://localhost:3001/connections"

echo ""
echo "✅ Ready for testing!"
echo ""

# Keep script running
echo "Press Ctrl+C to stop all services..."
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ All services stopped'; exit 0" INT

# Wait indefinitely
wait

