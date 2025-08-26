# ITI Online Examination System - Frontend

A modern React-based frontend for the ITI Online Examination System, designed with Material-UI and TypeScript.

## 🎨 Features

- **Modern UI/UX**: Clean, professional design with ITI branding
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Material-UI Components**: Beautiful, accessible components
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **ITI Branding**: Consistent red color scheme (#d32f2f)
- **Interactive Dashboard**: Statistics and recent activities
- **CRUD Operations**: Full management interface for all entities

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Main header with ITI branding
│   └── Sidebar.tsx     # Navigation sidebar
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Branches.tsx    # Branches management
│   ├── Departments.tsx # Departments management
│   ├── Instructors.tsx # Instructors management
│   ├── Courses.tsx     # Courses management
│   ├── Students.tsx    # Students management
│   ├── Exams.tsx       # Exams management
│   └── Questions.tsx   # Questions management
├── services/           # API services (to be implemented)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── assets/             # Static assets
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── App.css             # Global styles
```

## 🎯 Available Pages

### Dashboard
- System overview with statistics
- Recent activities feed
- Quick action buttons
- Progress indicators

### Branches Management
- View all ITI branches
- Add new branches
- Edit branch information
- Delete branches
- Statistics cards

### Other Management Pages
- **Departments**: Academic department management
- **Instructors**: Instructor profiles and assignments
- **Courses**: Course catalog and content
- **Students**: Student registration and results
- **Exams**: Exam creation and scheduling
- **Questions**: Question bank management

## 🎨 Design System

### Color Palette
- **Primary Red**: #d32f2f (ITI Brand Color)
- **Secondary Blue**: #1976d2
- **Success Green**: #388e3c
- **Warning Orange**: #f57c00
- **Background**: #f5f5f5
- **Text Primary**: #333333
- **Text Secondary**: #666666

### Typography
- **Font Family**: Roboto
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)

### Components
- **Cards**: Rounded corners with hover effects
- **Buttons**: Gradient backgrounds with animations
- **Tables**: Clean, readable data presentation
- **Forms**: Material-UI form components

## 🔧 Configuration

### Theme Configuration
The app uses a custom Material-UI theme with ITI branding:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', // ITI Red
      light: '#ff6659',
      dark: '#9a0007',
    },
    // ... other theme options
  },
});
```

### Proxy Configuration
The app is configured to proxy API requests to the backend:

```json
{
  "proxy": "http://localhost:3000"
}
```

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Mobile-first design with touch-friendly interactions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Serve Production Build
```bash
npx serve -s build
```

## 🔗 Backend Integration

This frontend is designed to work with the ITI Examination System backend API. The backend should be running on `http://localhost:3000` for development.

### API Endpoints (Expected)
- `GET /api/branches` - Get all branches
- `POST /api/branches` - Create new branch
- `PUT /api/branches/:id` - Update branch
- `DELETE /api/branches/:id` - Delete branch
- Similar endpoints for other entities

## 🎯 Future Enhancements

- [ ] Real API integration with backend
- [ ] Authentication and authorization
- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Data export functionality
- [ ] Dark mode support
- [ ] Multi-language support

## 📄 License

This project is part of the ITI Final Project - Online Examination System.

## 👥 Team

- **Institution**: ITI (Information Technology Institute)
- **Project Type**: Final Project
- **Technology Stack**: React, TypeScript, Material-UI

---

**ITI Online Examination System** - Empowering education through technology 