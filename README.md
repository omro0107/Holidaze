# Holidaze - Venue Booking Platform

![Holidaze Venue Booking Platform](/public/images/readme)

A modern, full-featured venue booking application built with React and Vite. Holidaze allows users to discover, book, and manage accommodation venues with an intuitive interface and comprehensive booking system.

## Features

### For Guests

- **Browse Venues**: Explore a wide variety of accommodation options
- **Advanced Search & Filtering**: Find venues by location, price, amenities, and availability
- **Interactive Calendar**: Select check-in and check-out dates with real-time availability
- **Secure Booking System**: Complete bookings with guest count and date validation
- **Booking Management**: View and manage your reservations
- **User Profiles**: Personalized user accounts with avatar support

### For Venue Managers

- **Venue Management**: Create, edit, and delete venue listings
- **Booking Overview**: Monitor all bookings for your venues
- **Media Gallery**: Upload and manage venue images
- **Amenity Management**: Specify venue features (WiFi, parking, breakfast, pets)
- **Location Services**: Detailed location information with address support

### General Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Authentication System**: Secure login and registration
- **Real-time Validation**: Form validation with comprehensive error handling
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components

### Form Management & Validation

- **React Hook Form** - Performant forms with easy validation
- **Yup** - Schema validation for forms
- **@hookform/resolvers** - Validation resolver for React Hook Form

### Date & Calendar

- **React Day Picker** - Flexible date picker component
- **date-fns** - Modern JavaScript date utility library

### UI Components & Icons

- **Heroicons** - Beautiful hand-crafted SVG icons
- **React Icons** - Popular icon libraries for React

### State Management & API

- **TanStack React Query** - Data fetching and caching
- **Axios** - HTTP client for API requests
- **Custom Hooks** - Reusable logic for authentication and API calls

### Development Tools

- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **PostCSS** - CSS processing with Tailwind

## Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Noroff API Key** (for backend integration)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd holidaze
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Noroff API key to the `.env` file:

```env
VITE_API_KEY=your_noroff_api_key_here
VITE_API_BASE_URL=https://v2.api.noroff.dev
```

** Important:** Never commit your `.env` file or share your API key publicly.

### 4. Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Building for Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Modal, etc.)
│   ├── Header/          # Navigation and header components
│   ├── Footer/          # Footer component
│   └── Layout/          # Layout wrapper components
├── pages/               # Page components
│   ├── Auth/           # Login and registration pages
│   ├── Venues/         # Venue-related pages and components
│   ├── Bookings/       # Booking management pages
│   └── Profile/        # User profile pages
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── API/                # API configuration and services
├── utils/              # Utility functions and constants
└── styles/             # Global styles and Tailwind config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code analysis

## API Integration

This application integrates with the Noroff API v2 for all data operations:

- **Authentication**: User registration and login
- **Venues**: CRUD operations for venue management
- **Bookings**: Create and manage reservations
- **Profiles**: User profile management with avatar support

The API client is configured with automatic authentication headers and error handling.

## Design System

### Color Palette

- **Primary**: Blue tones for main actions and branding
- **Secondary**: Gray tones for supporting elements
- **Success**: Green for positive actions
- **Warning**: Yellow for caution states
- **Error**: Red for error states

### Typography

- **Headings**: Inter font family with various weights
- **Body**: System font stack for optimal readability

### Components

All components follow consistent design patterns with:

- Proper spacing using Tailwind's spacing scale
- Consistent border radius and shadows
- Accessible color contrasts
- Responsive breakpoints

## Security Features

- **API Key Protection**: Environment variables for sensitive data
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Proper data sanitization
- **Authentication**: Secure token-based authentication
- **Route Protection**: Protected routes for authenticated users

## Responsive Design

The application is fully responsive with breakpoints for:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px and above

## Accessibility

- **WCAG 2.1 AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Sufficient contrast ratios for all text
- **Focus Management**: Clear focus indicators

## Testing

The application includes comprehensive error handling and validation:

- Form validation with real-time feedback
- API error handling with user-friendly messages
- Loading states for better user experience
- Fallback UI for error scenarios

## Deployment

The application can be deployed to various platforms:

### Netlify

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Vercel

```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write meaningful commit messages
- Add proper documentation for new features
- Ensure responsive design for all new components
- Test thoroughly across different devices and browsers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Noroff** - For providing the API and project requirements
- **React Team** - For the React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Open Source Community** - For all the libraries used in this project
- **Unsplash** - For all images used in this projects

---
