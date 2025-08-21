# Finance Tracker Application

A full-stack finance tracking application with integrated frontend and backend.

## Project Structure

```
finance-tracker/
└── finance-tracker-backend/     # Node.js/Express server with integrated frontend
    ├── public/                  # Frontend static files (HTML, CSS, JS)
    ├── routes/                  # API routes
    ├── models/                  # Database models
    ├── middleware/              # Express middleware
    └── sever.js                 # Main server file
```

## Setup Instructions

1. Navigate to the backend directory:
   ```powershell
   cd "d:\projrcts new\finance-tracker\finance-tracker-backend"
   ```

2. Install dependencies (if not already installed):
   ```powershell
   npm install
   ```

3. Start the application:
   ```powershell
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5000
   ```

## Features

### Backend API Endpoints
- `POST /api/expenses` - Add new expense
- `GET /api/expenses` - Get all expenses
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Frontend Features
- Modern, responsive web interface
- Add new expenses with form validation
- View expense list with real-time updates
- Delete expenses with confirmation
- Beautiful UI with animations
- Mobile-friendly design

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Static file serving

### Frontend
- Vanilla HTML, CSS, JavaScript
- Modern ES6+ features
- Responsive CSS Grid/Flexbox
- Fetch API for HTTP requests
- Real-time DOM updates

## Development

- The application serves both API and frontend from a single server
- Frontend files are in the `public/` directory
- API routes are prefixed with `/api/`
- Hot-reloading with nodemon for backend changes
- Edit frontend files directly in `public/` folder

## Running the Application

Simply run one command:
```powershell
npm run dev
```

This will:
- Start the Express server on port 5000
- Serve the frontend at `http://localhost:5000`
- Provide API endpoints at `http://localhost:5000/api/*`
- Auto-restart on backend file changes

## Notes

- All frontend and backend code is now in one integrated project
- No need for separate frontend build process
- Frontend communicates with backend via relative API URLs
- Environment variables should be configured in `.env` file
- Ensure MongoDB is running if using a local database
