# Course App - Full Stack Application

A modern course marketplace application built with Node.js/Express backend and React frontend with Material-UI.

## Features

### User Features
- User registration and authentication
- Browse available courses
- Purchase courses
- View purchased courses
- Search and filter courses
- Responsive design

### Admin Features
- Admin authentication
- Create, edit, and manage courses
- View all courses in admin dashboard
- Course management interface

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Zod for validation
- CORS for cross-origin requests

### Frontend
- React.js
- Material-UI (MUI)
- React Router for navigation
- Axios for API calls
- Context API for state management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd course-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   DB_URL=mongodb://localhost:27017/course-app
   USER_SECRET_KEY=your-user-secret-key
   SECRET_KEY=your-admin-secret-key
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

## Running the Application

### Backend
```bash
# From the root directory
npm run dev
```
The backend will start on `http://localhost:3000`

### Frontend
```bash
# From the frontend directory
cd frontend
npm start
```
The frontend will start on `http://localhost:3001`

## API Endpoints

### User Routes (`/user`)
- `POST /signin` - User login
- `POST /signup` - User registration
- `GET /purchases` - Get user's purchased courses

### Course Routes (`/course`)
- `GET /preview` - Get all courses
- `POST /purchase` - Purchase a course

### Admin Routes (`/admin`)
- `POST /signin` - Admin login
- `POST /signup` - Admin registration
- `POST /course` - Create a new course
- `GET /course/bulk` - Get all courses (admin view)
- `PUT /course` - Update a course

## Usage

1. **For Users:**
   - Register a new account or sign in
   - Browse available courses on the home page
   - Click on a course to view details
   - Purchase courses you're interested in
   - View your purchased courses in "My Courses"

2. **For Admins:**
   - Sign in with admin credentials
   - Access the admin dashboard
   - Create new courses with title, description, price, and image URL
   - Edit existing courses
   - Manage all courses in the system

## Project Structure

```
course-app/
├── index.js                 # Main server file
├── routes/                  # API routes
│   ├── user.js             # User routes
│   ├── course.js           # Course routes
│   └── admin.js            # Admin routes
├── schemas/                 # MongoDB schemas
│   ├── userschema.js       # User model
│   ├── courseschema.js     # Course model
│   ├── purchaseschema.js   # Purchase model
│   ├── adminschema.js      # Admin model
│   └── insert.js           # Sample data insertion
├── middlewares/            # Authentication middlewares
│   ├── user.js             # User authentication
│   └── admin.js            # Admin authentication
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── App.js          # Main app component
│   └── package.json
└── package.json
```

## Features to Add

- Course deletion functionality
- User profile management
- Course ratings and reviews
- Payment integration
- Course content management
- Email notifications
- Advanced search and filtering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 