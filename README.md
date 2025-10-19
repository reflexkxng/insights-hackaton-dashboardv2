# Insights Dashboard

A modern Next.js application that provides comprehensive insights about locations including weather, crime, transport, and amenities data.

## Features

- **Landing Page**: Clean, modern landing page with search functionality
- **Dashboard**: Comprehensive dashboard with multiple data cards
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Data**: Fetches data from external APIs
- **Interactive UI**: Hover cards and smooth animations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── dashboard/          # Dashboard page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── InsightCard.tsx     # Data insight cards
│   ├── NewsCard.tsx        # News display component
│   └── Sidebar.tsx         # Sidebar navigation
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Pages

### Landing Page (`/`)
- Clean, modern design with gradient background
- Search input with submit functionality
- Feature highlights
- Responsive layout

### Dashboard (`/dashboard`)
- Comprehensive data visualization
- Multiple insight cards (Weather, Crime, Transport, Amenities)
- Recent news feed
- Collapsible sidebar
- Search functionality

## API Integration

The dashboard expects a backend API running on `http://localhost:3000` with the following endpoints:

- `GET /api/cards` - Fetch all card data
- `GET /api/weather?q={query}` - Fetch weather and traffic data

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Component-specific styles are in individual component files

### Data Sources
- Update API endpoints in dashboard components
- Modify data structure in TypeScript interfaces
- Add new insight cards by extending the `CardData` interface

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## License

MIT License - feel free to use this project for your own purposes.
