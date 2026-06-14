# 🏆 THE GRAND ROYAL - Food Delivery App
## Complete Project Summary & Architecture

---

## 📱 Project Overview

**THE GRAND ROYAL** is a comprehensive food delivery platform built for **The Grand Royal Hotel** featuring our premium restaurant **Sky Lounge**.

### Key Information
- **App Name:** THE GRAND ROYAL
- **Restaurant:** Sky Lounge (Continental, Italian Cuisine)
- **Contact:** +91-9241878102
- **Location:** [The Grand Royal Hotel, Patna](https://www.google.com/maps/place/The+Grand+Royal+Hotel/@25.8665429,85.7638348,51m/data=!3m1!1e3!4m9!3m8!1s0x39ed9b007c4fba17:0xf9815701c44baece!5m2!4m1!1i2!8m2!3d25.8664548!4d85.7639781!16s%2Fg%2F11x1kx396z!5m1!1e3?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D)
- **Coordinates:** 25.8665429, 85.7638348 (Latitude), 85.7638348 (Longitude)

---

## 🏗️ Technology Stack

### Frontend (Mobile)
- **Framework:** React Native (Expo)
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation (Stack & Bottom Tabs)
- **UI Components:** React Native, Expo Icons
- **Styling:** StyleSheet (React Native)
- **API Client:** Axios
- **Real-time:** Socket.io Client

### Backend (API)
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** PostgreSQL (Primary), Redis (Caching)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs
- **Real-time Communication:** Socket.io
- **Payment Integration:** Stripe, Razorpay
- **File Upload:** AWS S3
- **Email Service:** Nodemailer
- **SMS Service:** Twilio

### Admin Dashboard (Web)
- **Framework:** React 18
- **State Management:** Redux Toolkit
- **UI Library:** Material-UI, Ant Design
- **Routing:** React Router v6
- **Charts:** Recharts
- **Forms:** Formik + Yup
- **API Client:** Axios

### DevOps & Deployment
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Version Control:** Git
- **CI/CD:** GitHub Actions (ready to configure)
- **Deployment:** Heroku, Vercel, AWS

---

## 📁 Project Structure

```
fooddelivery-app/
├── mobile/                          # React Native Mobile App
│   ├── src/
│   │   ├── screens/                # Screen components
│   │   │   ├── HomeScreen.js       # Restaurant listing
│   │   │   ├── RestaurantDetailScreen.js  # Menu & items
│   │   │   ├── CartScreen.js       # Shopping cart
│   │   │   ├── CheckoutScreen.js   # Payment
│   │   │   ├── OrderTrackingScreen.js  # Real-time tracking
│   │   │   ├── ProfileScreen.js    # User profile
│   │   │   ├── LoginScreen.js      # Authentication
│   │   │   └── RegisterScreen.js   # Registration
│   │   ├── components/             # Reusable components
│   │   ├── navigation/             # Navigation setup
│   │   ├── redux/
│   │   │   ├── store.js            # Redux store
│   │   │   └── slices/
│   │   │       └── cartSlice.js    # Cart state management
│   │   ├── services/               # API services
│   │   ├── utils/                  # Helper functions
│   │   ├── styles/                 # Global styles
│   │   ├── assets/                 # Images, fonts
│   │   └── App.js                  # Main app component
│   ├── app.json                    # Expo configuration
│   ├── package.json
│   ├── .env.example
│   ├── ios/                        # iOS native code
│   └── android/                    # Android native code
│
├── backend/                         # Node.js/Express API
│   ├── src/
│   │   ├── controllers/            # Request handlers
│   │   │   ├── authController.js   # Auth logic
│   │   │   └── restaurantController.js  # Restaurant logic
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.js             # Auth routes
│   │   │   └── restaurants.js      # Restaurant routes
│   │   ├── models/                 # Database models (Sequelize)
│   │   ├── middleware/             # Express middleware
│   │   │   └── auth.js             # JWT auth middleware
│   │   ├── services/               # Business logic
│   │   ├── utils/
│   │   │   ├── auth.js             # Auth utilities
│   │   │   └── validators.js       # Input validators
│   │   ├── config/
│   │   │   └── database.js         # DB connection
│   │   └── app.js                  # Express setup
│   ├── migrations/                 # Database migrations
│   ├── seeders/                    # Sample data
│   ├── tests/                      # Test files
│   ├── server.js                   # Entry point
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile                  # Docker configuration
│
├── admin/                           # React Admin Dashboard
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   ├── components/             # Reusable components
│   │   ├── services/               # API services
│   │   ├── redux/                  # Redux store
│   │   ├── styles/                 # CSS files
│   │   ├── utils/                  # Helper functions
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── docs/                            # Documentation
│   ├── API.md                      # API endpoints reference
│   ├── DATABASE.md                 # Database schema
│   └── SETUP.md                    # Installation guide
│
├── docker-compose.yml              # Docker Compose config
├── Dockerfile.backend              # Backend Docker image
├── .gitignore
├── README.md                       # Project README
├── CONTRIBUTING.md                 # Contribution guidelines
├── ABOUT_THE_GRAND_ROYAL.md        # About the hotel & app
└── LICENSE                         # MIT License
```

---

## 🎨 Color Scheme & Branding

**Primary Color:** `#D4A574` (Gold/Beige)
- Used for headers, buttons, highlights
- Represents luxury and elegance

**Secondary Colors:**
- White: `#fff` - Clean backgrounds
- Dark Text: `#333` - Main text
- Gray: `#999` - Secondary text
- Light Gray: `#eee` - Borders, dividers

**Accent Colors:**
- Gold: `#FFD700` - Ratings/stars
- Success Green: `#27AE60`
- Error Red: `#E74C3C`
- Warning Orange: `#F39C12`

---

## 🔄 Data Flow Architecture

### User Authentication Flow
```
User Input → Register/Login Screen
    ↓
API Call (authController.register/login)
    ↓
JWT Token Generated
    ↓
Token Stored in Device Storage
    ↓
Auth Middleware Validates Token
    ↓
Access Granted/Denied
```

### Order Placement Flow
```
Browse Restaurants (HomeScreen)
    ↓
Select Restaurant (RestaurantDetailScreen)
    ↓
Add Items to Cart (Redux cartSlice)
    ↓
View Cart (CartScreen)
    ↓
Checkout (CheckoutScreen)
    ↓
Payment Processing (Stripe/Razorpay)
    ↓
Order Created in Database
    ↓
Real-time Updates (Socket.io)
    ↓
Order Tracking (OrderTrackingScreen)
```

### Real-time Updates
```
Backend Event (Socket.io)
    ↓
Broadcast to Connected Clients
    ↓
Update Mobile App State
    ↓
Refresh UI (React Native)
```

---

## 🚀 Core Features Implemented

### ✅ MVP Features (Phase 1)
1. **User Authentication**
   - Register with email/phone
   - Login with credentials
   - JWT token management
   - Password hashing with bcrypt

2. **Restaurant Management**
   - Browse all restaurants
   - Search by name/cuisine
   - View restaurant details
   - Restaurant registration

3. **Menu System**
   - View menu items by category
   - Item details with descriptions
   - Pricing display
   - Dietary information (Veg/Vegan)

4. **Shopping Cart**
   - Add items to cart
   - Update quantities
   - Remove items
   - Cart total calculation
   - Redux state management

5. **Navigation**
   - Bottom tab navigation
   - Stack navigation between screens
   - Deep linking ready

### 📋 Features in Progress (Phase 2)
1. **Payment Integration**
   - Stripe payment gateway
   - Razorpay integration
   - Wallet system
   - Promo code application

2. **Order Management**
   - Order creation
   - Status tracking (Pending → Delivered)
   - Real-time updates
   - Delivery partner assignment

3. **Ratings & Reviews**
   - Post-delivery reviews
   - Restaurant ratings
   - Photo attachments
   - Review display

4. **Admin Dashboard**
   - Order management
   - Menu management
   - Analytics dashboard
   - Restaurant analytics

5. **Delivery Tracking**
   - Real-time GPS tracking
   - Estimated delivery time
   - Delivery partner details
   - Route optimization

---

## 🔐 Security Features

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (RBAC)
   - Secure password hashing (bcryptjs)

2. **Data Protection**
   - Environment variables for secrets
   - SSL/TLS support (production)
   - CORS protection
   - Input validation & sanitization

3. **API Security**
   - Rate limiting
   - Request validation
   - Error handling without exposing internals
   - Helmet.js for security headers

4. **Database**
   - PostgreSQL with strong encryption
   - Connection pooling
   - Backup strategy
   - Migration versioning

---

## 📊 Database Schema Summary

### Main Tables
1. **users** - Customer, restaurant, delivery partner profiles
2. **restaurants** - Restaurant information and metadata
3. **categories** - Menu categories per restaurant
4. **menu_items** - Food items with pricing and details
5. **orders** - Order records and status tracking
6. **order_items** - Individual items in each order
7. **ratings** - Customer reviews and ratings
8. **payments** - Payment transaction records
9. **delivery_partners** - Delivery personnel information
10. **wallets** - User wallet balances
11. **wallet_transactions** - Wallet credit/debit history
12. **promo_codes** - Discount coupons

See [DATABASE.md](docs/DATABASE.md) for complete schema.

---

## 🔌 API Endpoints Summary

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token

### Restaurants
- `GET /api/v1/restaurants` - List all restaurants
- `GET /api/v1/restaurants/:id` - Get restaurant details
- `POST /api/v1/restaurants` - Create restaurant (Owner)

### Menu Items
- `GET /api/v1/restaurants/:id/menu-items` - Get menu
- `POST /api/v1/restaurants/:id/menu-items` - Add menu item (Owner)

### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - Get customer orders
- `GET /api/v1/orders/:id` - Get order details
- `PATCH /api/v1/orders/:id/status` - Update order status (Restaurant)
- `POST /api/v1/orders/:id/cancel` - Cancel order

See [API.md](docs/API.md) for complete documentation.

---

## 🛠️ Development Workflow

### Local Setup
```bash
# 1. Clone repository
git clone https://github.com/hotelgrandroyal6-arch/fooddelivery-app.git
cd fooddelivery-app

# 2. Setup Backend
cd backend
npm install
cp .env.example .env
npm run migrate
npm run dev

# 3. Setup Mobile (in new terminal)
cd ../mobile
npm install
cp .env.example .env
npm run android  # or npm run ios

# 4. Setup Admin (in new terminal)
cd ../admin
npm install
cp .env.example .env
npm start
```

### Docker Setup
```bash
# Start all services
docker-compose up

# Stop all services
docker-compose down
```

---

## 📱 App Screenshots (Planned)

1. **Home Screen** - Restaurant list with search
2. **Restaurant Detail** - Menu with categories
3. **Cart Screen** - Items with quantities
4. **Checkout Screen** - Payment options
5. **Order Tracking** - Real-time GPS tracking
6. **Profile Screen** - User account management

---

## 🚢 Deployment Strategy

### Backend Deployment
- **Staging:** Heroku or AWS EC2
- **Production:** AWS ECS, DigitalOcean, or Heroku
- **Database:** AWS RDS PostgreSQL
- **Caching:** AWS ElastiCache (Redis)
- **File Storage:** AWS S3

### Mobile Deployment
- **Android:** Google Play Store
- **iOS:** Apple App Store
- **Testing:** Google Play Internal Testing, TestFlight

### Admin Dashboard
- **Hosting:** Vercel, Netlify, or AWS S3 + CloudFront
- **CI/CD:** GitHub Actions

---

## 📈 Performance Optimization

1. **Frontend**
   - Code splitting with React Navigation
   - Image caching and optimization
   - Redux selector memoization

2. **Backend**
   - Database query optimization
   - Connection pooling (PostgreSQL)
   - Redis caching for frequent queries
   - API response compression

3. **Mobile**
   - Lazy loading of list items
   - Image lazy loading
   - Background task scheduling
   - Local storage for offline support

---

## 🧪 Testing Strategy

### Backend Tests
- Unit tests for controllers and services
- Integration tests for API endpoints
- Database migration tests
- JWT authentication tests

### Mobile Tests
- Component unit tests
- Redux store tests
- Navigation tests
- API service mocks

### Admin Tests
- Component tests
- Redux store tests
- Integration tests

---

## 📞 Support & Contact

**The Grand Royal Hotel**
- **Phone:** +91-9241878102
- **Email:** support@thegradroyalhotel.com
- **Location:** Patna, Bihar, India
- **Website:** [thegradroyalhotel.com](https://thegradroyalhotel.com)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Development Team

Built with ❤️ by the Grand Royal Hotel Development Team

- **Project Owner:** The Grand Royal Hotel
- **Restaurant:** Sky Lounge
- **Start Date:** June 2026
- **Status:** 🚧 In Active Development

---

## 🎯 Next Steps

1. ✅ Complete API endpoints implementation
2. ✅ Database integration with Sequelize
3. ✅ Payment gateway integration
4. ✅ Real-time order tracking with Socket.io
5. ✅ Delivery partner tracking
6. ✅ Admin dashboard completion
7. ✅ Mobile app UI/UX refinement
8. ✅ Testing and QA
9. ✅ Deployment to production
10. ✅ Post-launch monitoring and optimization

---

**Last Updated:** June 14, 2026
**Version:** 1.0.0 (MVP)
