# Holidaze - Venue Booking Application

A modern venue booking application built with React and Vite, allowing users to browse, book, and manage venues.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd holidaze
```

2. Install dependencies:

```bash
npm install
```

3. Environment Setup:

- Copy `.env.example` to create a new `.env` file:

```bash
cp .env.example .env
```

- Add your Noroff API key to the `.env` file:

```
VITE_API_KEY=your_api_key_here
```

**Important:** Never commit your `.env` file or share your API key publicly.

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

Build the application:

```bash
npm run build
```

## Features

- Browse available venues
- Book venues with date selection
- Venue management for owners
- User authentication
- Profile management
- Responsive design

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- React Icons
- Date-fns

## API Integration

This project uses the Noroff API for all data operations. The API key is required for authentication and should be kept secure. The API key is stored in the `.env` file and is automatically included in all API requests through the `useApi` hook.

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
