# Item Selector with Folders

This is an Angular application that implements an interactive item selector with a folder structure. The application allows users to select items from a hierarchical folder structure and displays the selected item IDs.

## Requirements

- Node.js (version 16 or higher)
- npm (version 7 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server, run:
```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Features

- Hierarchical folder structure display
- Folder and item selection with checkboxes
- Indeterminate state for folders with partial selection
- Clear selection button
- Selected item IDs display
- Hover states for all rows
- Alphabetical sorting of folders and items
- Initially expanded folders

## Project Structure

- `src/app/components/item-selector/` - Contains the item selector component
- `src/app/services/` - Contains the service for data handling
- `src/assets/` - Contains the mock data file

## Implementation Details

- Built with Angular 19.2.0
- Uses TypeScript for type safety
- Implements proper folder hierarchy processing
- Handles selection state management
- Uses Angular's HttpClient for data fetching
- Custom styling without external component libraries
