#!/bin/bash

# THE GRAND ROYAL - Setup Script
# Automated setup for local development

echo "🏨 THE GRAND ROYAL - Food Delivery App Setup"
echo "============================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not found in PATH. Please ensure PostgreSQL is installed."
else
    echo "✅ PostgreSQL found"
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -f .env ]; then
    echo "   Creating .env file..."
    cp .env.example .env
    echo "   ⚠️  Please update backend/.env with your configuration"
fi

echo "   Installing dependencies..."
npm install

echo "✅ Backend setup complete"
cd ..
echo ""

# Setup Mobile
echo "📱 Setting up Mobile App..."
cd mobile

if [ ! -f .env ]; then
    echo "   Creating .env file..."
    cp .env.example .env
    echo "   ⚠️  Please update mobile/.env with your configuration"
fi

echo "   Installing dependencies..."
npm install

echo "✅ Mobile setup complete"
cd ..
echo ""

# Setup Admin
echo "🖥️  Setting up Admin Dashboard..."
cd admin

if [ ! -f .env ]; then
    echo "   Creating .env file..."
    cp .env.example .env
    echo "   ⚠️  Please update admin/.env with your configuration"
fi

echo "   Installing dependencies..."
npm install

echo "✅ Admin setup complete"
cd ..
echo ""

echo "============================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure environment variables in .env files"
echo "2. Set up PostgreSQL database"
echo "3. Run database migrations: cd backend && npm run migrate"
echo "4. Start backend: npm run dev"
echo "5. Start mobile: cd mobile && npm run android"
echo "6. Start admin: cd admin && npm start"
echo ""
echo "📞 Support: +91-9241878102"
echo "🔗 Location: https://www.google.com/maps/place/The+Grand+Royal+Hotel"
echo ""
