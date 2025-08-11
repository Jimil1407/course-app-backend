# Course App - Full Stack Application

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)

A modern, full-stack course marketplace application built with Node.js/Express backend and React frontend with Material-UI. This application provides a comprehensive platform for managing online courses with separate interfaces for users and administrators.

## 🚀 Features

### 👥 User Features
- **User Authentication**: Secure registration and login system
- **Course Discovery**: Browse and search through available courses
- **Course Purchase**: Purchase courses with secure transactions
- **Personal Dashboard**: View purchased courses in "My Courses"
- **Responsive Design**: Optimized for all device sizes
- **Interactive UI**: Modern and intuitive user interface

### 👨‍💼 Admin Features
- **Admin Authentication**: Separate admin login system
- **Course Management**: Create, edit, and manage courses
- **Admin Dashboard**: Comprehensive overview of all courses
- **Bulk Operations**: Manage multiple courses efficiently
- **Content Control**: Full control over course content and pricing

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Validation**: Zod for schema validation
- **CORS**: Cross-Origin Resource Sharing support

### Frontend
- **Library**: React.js
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: Material-UI components and theming

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Installation Guide](https://docs.mongodb.com/manual/installation/)
- **npm** or **yarn** package manager
- **Git** for version control

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Jimil1407/course-app-backend.git
cd course-app-backend
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_URL=mongodb://localhost:27017/course-app

# JWT Secret Keys
USER_SECRET_KEY=your-user-secret-key-here
SECRET_KEY=your-admin-secret-key-here

# Server Configuration (Optional)
PORT=3000
FRONTEND_PORT=3001
```

### 5. Database Setup
Ensure MongoDB is running on your system:

```bash
# Start MongoDB service (varies by OS)
# Windows:
net start MongoDB

# macOS (with Homebrew):
brew services start mongodb/brew/mongodb-community

# Linux (systemd):
sudo systemctl start mongod
```

## 🚀 Running the Application

### Development Mode

#### Start the Backend Server
```bash
# From the root directory
npm run dev
```
The backend server will start on `http://localhost:3000`

#### Start the Frontend Development Server
```bash
# Open a new terminal and navigate to frontend directory
cd frontend
npm start
```
The frontend will start on `http://localhost:3001`

### Production Mode

#### Build the Frontend
```bash
cd frontend
npm run build
```

#### Start the Production Server
```bash
# From the root directory
npm start
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### User Endpoints (`/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signin` | User login | No |
| POST | `/user/signup` | User registration | No |
| GET | `/user/purchases` | Get user's purchased courses | Yes |

### Course Endpoints (`/course`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/course/preview` | Get all available courses | No |
| POST | `/course/purchase` | Purchase a course | Yes (User) |

### Admin Endpoints (`/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/signin` | Admin login | No |
| POST | `/admin/signup` | Admin registration | No |
| POST | `/admin/course` | Create a new course | Yes (Admin) |
| GET | `/admin/course/bulk` | Get all courses (admin view) | Yes (Admin) |
| PUT | `/admin/course` | Update an existing course | Yes (Admin) |

### Request/Response Examples

#### User Registration
```bash
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### Course Creation (Admin)
```bash
curl -X POST http://localhost:3000/admin/course \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-jwt-token>" \
  -d '{
    "title": "Complete React Development",
    "description": "Learn React from basics to advanced",
    "price": 99.99,
    "imageUrl": "https://example.com/course-image.jpg"
  }'
```

## 🎯 Usage Guide

### For Students/Users

1. **Registration**: Create a new account using email and password
2. **Browse Courses**: Explore available courses on the home page
3. **Course Details**: Click on any course to view detailed information
4. **Purchase**: Buy courses that interest you
5. **My Courses**: Access your purchased courses from the dashboard
6. **Learning**: Start learning from your purchased content

### For Instructors/Admins

1. **Admin Access**: Sign in with admin credentials
2. **Dashboard**: Access the comprehensive admin dashboard
3. **Course Creation**: Add new courses with titles, descriptions, pricing, and media
4. **Course Management**: Edit existing courses and update content
5. **Analytics**: Monitor course performance and user engagement
6. **Content Control**: Manage course availability and pricing

## 📁 Project Structure

```
course-app-backend/
├── 📄 README.md              # Project documentation
├── 📄 package.json           # Backend dependencies
├── 📄 index.js               # Main server file
├── 📁 routes/                # API route handlers
│   ├── 📄 user.js           # User authentication routes
│   ├── 📄 course.js         # Course-related routes
│   └── 📄 admin.js          # Admin management routes
├── 📁 schemas/              # Database schemas
│   ├── 📄 userschema.js     # User model definition
│   ├── 📄 courseschema.js   # Course model definition
│   ├── 📄 purchaseschema.js # Purchase model definition
│   ├── 📄 adminschema.js    # Admin model definition
│   └── 📄 insert.js         # Sample data insertion script
├── 📁 middlewares/          # Authentication middlewares
│   ├── 📄 user.js           # User authentication middleware
│   └── 📄 admin.js          # Admin authentication middleware
└── 📁 frontend/             # React frontend application
    ├── 📄 package.json      # Frontend dependencies
    ├── 📁 public/           # Static assets
    └── 📁 src/              # Source code
        ├── 📁 components/   # Reusable UI components
        ├── 📁 pages/        # Page components
        ├── 📁 contexts/     # React context providers
        └── 📄 App.js        # Main application component
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **Input Validation**: Zod schema validation for all inputs
- **CORS Protection**: Configured cross-origin resource sharing
- **Environment Variables**: Sensitive data stored in environment variables
- **Route Protection**: Protected routes for authenticated users

## 🚧 Roadmap & Future Features

- [ ] **Course Deletion**: Admin ability to delete courses
- [ ] **User Profiles**: Enhanced user profile management
- [ ] **Ratings & Reviews**: Course rating and review system
- [ ] **Payment Integration**: Stripe/PayPal payment gateway
- [ ] **Video Streaming**: Integrated video player for course content
- [ ] **Notifications**: Email and in-app notification system
- [ ] **Advanced Search**: Enhanced search with filters and sorting
- [ ] **Mobile App**: React Native mobile application
- [ ] **Analytics Dashboard**: Detailed analytics for admins
- [ ] **Course Certificates**: Completion certificates for students

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/Jimil1407/course-app-backend.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm test
   npm run test:frontend
   ```

5. **Commit Your Changes**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```

6. **Push to Your Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Submit a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all tests pass

### Development Guidelines

- Follow JavaScript ES6+ standards
- Use meaningful commit messages
- Write unit tests for new features
- Update documentation for API changes
- Ensure responsive design for frontend changes

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB if not running
sudo systemctl start mongod
```

**Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Performance

- **Backend**: Express.js with optimized middleware stack
- **Database**: MongoDB with indexed queries
- **Frontend**: React with lazy loading and code splitting
- **Security**: Minimal attack surface with input validation
- **Scalability**: Modular architecture for easy scaling

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express.js](https://expressjs.com/) - Web framework
- [React](https://reactjs.org/) - Frontend library
- [Material-UI](https://mui.com/) - React UI framework
- [MongoDB](https://www.mongodb.com/) - Database
- [JWT](https://jwt.io/) - Authentication tokens

## 📞 Support

If you have any questions or need support:

- **Email**: [support@courseapp.com](mailto:support@courseapp.com)
- **Issues**: [GitHub Issues](https://github.com/Jimil1407/course-app-backend/issues)
- **Documentation**: [Wiki](https://github.com/Jimil1407/course-app-backend/wiki)

---

**Built with ❤️ by [Jimil1407](https://github.com/Jimil1407)**
