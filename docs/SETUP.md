# 🚀 Setup & Installation Guide

## Prerequisites

Before you start, make sure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **React Native CLI** - Install with: `npm install -g react-native-cli`
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
- **Xcode** (for iOS development on Mac) - Available on App Store

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/hotelgrandroyal6-arch/fooddelivery-app.git
cd fooddelivery-app
```

---

## 2️⃣ Backend Setup (Node.js + Express)

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables
Edit `.env` file with your configuration:

```env
# Server
NODE_ENV=development
PORT=5000
HOST=localhost

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=fooddelivery_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRY=7d

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx

# Razorpay Payment (Optional)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# AWS S3 (for image uploads)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your_bucket_name
AWS_S3_REGION=us-east-1

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Twilio (for SMS)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1xxx

# Socket.io
SOCKET_PORT=3001

# Admin
ADMIN_SECRET_KEY=admin_secret_key
```

### Step 5: Setup PostgreSQL Database

Open PostgreSQL CLI and create database:
```sql
CREATE DATABASE fooddelivery_db;
CREATE USER fooddelivery_user WITH PASSWORD 'your_password';
ALTER ROLE fooddelivery_user SET client_encoding TO 'utf8';
ALTER ROLE fooddelivery_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE fooddelivery_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE fooddelivery_db TO fooddelivery_user;
```

### Step 6: Run Migrations
```bash
npm run migrate
```

### Step 7: Seed Sample Data (Optional)
```bash
npm run seed
```

### Step 8: Start Backend Server
```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## 3️⃣ Mobile App Setup (React Native)

### Step 1: Navigate to Mobile Directory
```bash
cd ../mobile
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables
Edit `.env` file:

```env
API_BASE_URL=http://localhost:5000/api/v1
SOCKET_URL=http://localhost:3001
STRIPE_PUBLIC_KEY=pk_test_xxx
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Step 5: For Android Development

Install Android SDK:
```bash
# Set ANDROID_HOME environment variable
export ANDROID_HOME=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Start Android Emulator or connect a physical device, then run:
```bash
npm run android
```

### Step 6: For iOS Development (Mac only)

Install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

Start the app:
```bash
npm run ios
```

---

## 4️⃣ Admin Dashboard Setup (React)

### Step 1: Navigate to Admin Directory
```bash
cd ../admin
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables
Edit `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxx
```

### Step 5: Start Admin Dashboard
```bash
npm start
```

Admin Dashboard will run on `http://localhost:3000`

---

## 📁 Project Structure Details

### Backend Structure
```
backend/
├── src/
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middlewares
│   ├── services/          # Business logic
│   ├── utils/             # Helper functions
│   ├── config/            # Configuration files
│   ├── validators/        # Input validation
│   └── app.js            # Express app setup
├── migrations/            # Database migrations
├── seeders/              # Seed data
├── tests/                # Test files
├── .env.example          # Environment variables template
├── package.json
└── server.js             # Entry point
```

### Mobile Structure
```
mobile/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation setup
│   ├── redux/            # Redux store
│   ├── services/         # API services
│   ├── utils/            # Helper functions
│   ├── styles/           # Global styles
│   ├── assets/           # Images, fonts, etc
│   └── App.js            # Main app component
├── ios/                  # iOS native code
├── android/              # Android native code
├── app.json              # App configuration
└── package.json
```

### Admin Structure
```
admin/
├── src/
│   ├── pages/            # Page components
│   ├── components/       # Reusable components
│   ├── services/         # API services
│   ├── redux/            # Redux store
│   ├── styles/           # CSS files
│   ├── utils/            # Helper functions
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── public/               # Static files
├── package.json
└── .env.example
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Mobile Tests
```bash
cd mobile
npm test
```

### Run Admin Tests
```bash
cd admin
npm test
```

---

## 🔧 Common Issues & Solutions

### Issue: PostgreSQL Connection Error
**Solution:** 
- Verify PostgreSQL is running
- Check DB credentials in `.env`
- Ensure database exists: `CREATE DATABASE fooddelivery_db;`

### Issue: Port 5000 already in use
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### Issue: Android emulator not starting
**Solution:**
```bash
# Create a new emulator
android create avd -n MyEmulator -t android-29 -c 512M

# Or use existing
emulator -avd MyEmulator
```

### Issue: iOS build fails
**Solution:**
```bash
cd ios
pod install --repo-update
cd ..
npm run ios
```

### Issue: Module not found
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 🚀 Deployment

### Deploy Backend to Heroku

```bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Deploy Mobile to App Stores

**Android:**
```bash
cd android
./gradlew bundleRelease
```

**iOS:**
Use Xcode to build and submit to App Store.

### Deploy Admin to Vercel

```bash
cd admin
npm run build
vercel
```

---

## 📚 Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend in development mode |
| `npm run build` | Build backend for production |
| `npm test` | Run tests |
| `npm run migrate` | Run database migrations |
| `npm run seed` | Seed sample data |
| `npm run lint` | Check code style |
| `npm run format` | Format code |

---

## 🆘 Need Help?

- Check [API Documentation](./API.md)
- Check [Database Schema](./DATABASE.md)
- Create an issue on GitHub
- Contact the development team

---

**Happy coding! 🚀**
