# 🏗️ System Architecture

## Overall Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                               │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  React Native    │  │   React Admin    │  │  Delivery App    │  │
│  │  Mobile App      │  │   Dashboard      │  │  (Future)        │  │
│  │  (iOS/Android)   │  │  (Web)           │  │                  │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                     │             │
│           └─────────────────────┼─────────────────────┘             │
│                                 │                                   │
└─────────────────────────────────┼───────────────────────────────────┘
                                  │
                                  │ HTTP(S) + WebSocket
                                  │
┌─────────────────────────────────┼───────────────────────────────────┐
│                        API LAYER                                    │
├─────────────────────────────────┼───────────────────────────────────┤
│                                 │                                   │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │           Node.js/Express API Server (Port 5000)           │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │  Routes & Controllers                                      │   │
│  │  ├── Authentication Routes                                 │   │
│  │  ├── Restaurant Routes                                     │   │
│  │  ├── Menu Routes                                           │   │
│  │  ├── Order Routes                                          │   │
│  │  └── Payment Routes                                        │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │  Middleware Stack                                          │   │
│  │  ├── JWT Authentication                                    │   │
│  │  ├── Rate Limiting                                         │   │
│  │  ├── CORS & Security Headers (Helmet)                      │   │
│  │  ├── Request Validation                                    │   │
│  │  └── Error Handling                                        │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │  Services & Business Logic                                 │   │
│  │  ├── Authentication Service (JWT, Password Hashing)        │   │
│  │  ├── Restaurant Service                                    │   │
│  │  ├── Order Service                                         │   │
│  │  ├── Payment Service (Stripe, Razorpay)                    │   │
│  │  └── Notification Service (Email, SMS)                     │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │  Real-time Communication                                   │   │
│  │  ├── Socket.io Server (Port 3001)                          │   │
│  │  ├── Order Status Updates                                  │   │
│  │  ├── Delivery Tracking                                     │   │
│  │  └── Live Notifications                                    │   │
│  └────────────────────────────────────────────────────────────┘   │
└────────────┬────────────────────────────┬──────────────────────────┘
             │                            │
             │                            │ WebSocket
             │ SQL                        │
             ↓                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌──────────────────────┐                │
│  │   PostgreSQL         │  │   Redis Cache        │                │
│  │   (Main Database)    │  │   (Session/Cache)    │                │
│  │  ├── Users           │  │                      │                │
│  │  ├── Restaurants     │  │  TTL: 1 hour         │                │
│  │  ├── Orders          │  │  Max Size: 1GB       │                │
│  │  ├── Payments        │  │                      │                │
│  │  └── Ratings         │  └──────────────────────┘                │
│  └──────────────────────┘                                          │
└─────────────────────────────────────────────────────────────────────┘
             │
             │ File Upload
             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  AWS S3          │  │  Stripe / Razorpay  │  │  Google Maps   │  │
│  │  (File Storage)  │  │  (Payments)      │  │  (Location)    │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│  ┌──────────────────┐  ┌──────────────────┐                         │
│  │  Nodemailer      │  │  Twilio          │                         │
│  │  (Email)         │  │  (SMS)           │                         │
│  └──────────────────┘  └──────────────────┘                         │
└─────────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ POST /auth/register
       │ {email, password, phone, role}
       ↓
┌─────────────────────────────┐
│  Authentication Controller  │
│  ├── Validate Input         │
│  ├── Hash Password (bcrypt) │
│  └── Create User in DB      │
└──────────┬──────────────────┘
           │
           ↓
┌──────────────────────────────┐
│  JWT Token Generation        │
│  payload: {id, email, role}  │
│  secret: JWT_SECRET          │
│  expires: 7 days             │
└──────────┬───────────────────┘
           │
           ↓
┌─────────────────────────────┐
│   Send Token to Client      │
│   Store in Device Storage   │
└─────────────────────────────┘

Subsequent Requests:
┌─────────────────────────────┐
│   Client with Token         │
│   Authorization: Bearer ... │
└──────────┬──────────────────┘
           │
           ↓
┌────────────────────────────────┐
│   Middleware: authenticatate   │
│   ├── Extract token            │
│   ├── Verify JWT signature     │
│   ├── Check expiration         │
│   └── Set req.user             │
└──────────┬─────────────────────┘
           │
           ├─ Valid ──→ Proceed
           └─ Invalid ─→ 401 Unauthorized
```

## Order Processing Flow

```
1. USER SELECTION
   │
   ├── Browse Restaurants (HomeScreen)
   ├── Select Restaurant
   └── View Menu
   
2. CART MANAGEMENT (Redux)
   │
   ├── Add Items to Cart (cartSlice.addItem)
   ├── Update Quantities (cartSlice.updateQuantity)
   ├── Remove Items (cartSlice.removeItem)
   └── Calculate Total (Redux selector)
   
3. CHECKOUT
   │
   ├── Customer Input
   │   ├── Delivery Address
   │   ├── Special Instructions
   │   └── Payment Method
   │
   ├── Apply Promo Code (optional)
   │
   └── Review Order Summary
   
4. PAYMENT PROCESSING
   │
   ├── POST /api/v1/payments/create-intent
   │   └── Stripe/Razorpay Initialize
   │
   ├── User Confirms Payment
   │
   └── POST /api/v1/payments/verify
       └── Verify Transaction
   
5. ORDER CREATION
   │
   ├── POST /api/v1/orders
   │
   ├── Database Entry
   │   ├── Order Record
   │   ├── Order Items
   │   └── Payment Record
   │
   └── Generate Order Number
   
6. REAL-TIME UPDATES (Socket.io)
   │
   ├── Broadcast to Restaurant
   ├── Broadcast to Customer
   └── Update Order Status
       ├── Pending
       ├── Confirmed
       ├── Preparing
       ├── Ready
       ├── Out for Delivery
       └── Delivered
   
7. DELIVERY ASSIGNMENT
   │
   ├── Find Available Delivery Partner
   ├── Assign Order
   └── Start Real-time GPS Tracking
   
8. ORDER TRACKING
   │
   ├── Real-time Location Updates
   ├── Estimated Delivery Time
   └── Delivery Partner Details
   
9. DELIVERY & COMPLETION
   │
   ├── Delivery Confirmation
   ├── Order Status: Delivered
   └── Enable Rating & Review
```

## Real-time Communication (Socket.io)

```
CLIENT SIDE:
│
├── Socket Connection
│   socket.io('http://localhost:3001')
│
├── Join Rooms
│   socket.emit('join-order', orderId)
│   socket.emit('join-delivery', deliveryId)
│
├── Listen for Events
│   socket.on('order-status-changed', handleStatusChange)
│   socket.on('location-updated', handleLocationUpdate)
│
└── Update UI
    Dispatch Redux Action → Update State → Re-render

SERVER SIDE:
│
├── Maintain Active Connections
│   io.on('connection', handleConnection)
│
├── Manage Rooms
│   socket.join(`order-${orderId}`)
│   socket.join(`delivery-${deliveryId}`)
│
├── Broadcast Events
│   io.to(`order-${orderId}`).emit('order-status-changed', data)
│   io.to(`delivery-${deliveryId}`).emit('location-updated', data)
│
└── Handle Disconnections
    socket.on('disconnect', handleDisconnect)
```

## Scalability Considerations

### Horizontal Scaling
```
Load Balancer (Nginx/ALB)
    │
    ├── API Server 1 (5000)
    ├── API Server 2 (5000)
    └── API Server 3 (5000)
         │
         └── Shared PostgreSQL
         └── Shared Redis
```

### Database Optimization
- Connection pooling (max 5 connections)
- Query result caching in Redis
- Database indexing on frequent queries
- Read replicas for analytics queries

### Caching Strategy
```
Request → Check Redis Cache
          ├─ HIT → Return Cached Data
          └─ MISS → Query DB → Cache → Return
```

---

**Last Updated:** June 14, 2026
