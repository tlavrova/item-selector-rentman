# Item Selector for Rentman

This project is an Angular-based item selector component designed for Rentman integration.

## Requirements

- Node.js (version 18.13.0 or higher)
- npm (version 9.0.0 or higher)
- Angular CLI (version 19.2.9 or higher)

## Setup

1. Verify your environment:
```bash
node --version  # Should show 18.13.0 or higher
npm --version   # Should show 9.0.0 or higher
ng version      # Should show 19.2.9 or higher
```

2. Clone the repository:
```bash
git clone https://github.com/your-username/item-selector-rentman.git
cd item-selector-rentman
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200/`.

## Project Structure

- `src/app/components/` - Contains all Angular components
  - `item-selector/` - Main component that orchestrates the item selection functionality
  - `folder-item/` - Component for rendering folder items
  - `item-list/` - Component for rendering lists of items
  - `item-row/` - Component for rendering individual items
  - `selection-info/` - Component for displaying selection information

## Features

- Hierarchical folder structure
- Item selection with checkboxes
- Folder expansion/collapse functionality
- Keyboard navigation support
- Focus state management
- Responsive design

## Development

- Run `ng serve` for a dev server
- Run `ng build` to build the project
- Run `ng test` to execute unit tests

## Troubleshooting

1. If you encounter any issues during installation:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules folder and package-lock.json
   - Run `npm install` again

2. If the application fails to start:
   - Make sure all required ports (4200) are available
   - Check if all dependencies are installed correctly
   - Verify your Node.js and npm versions match the requirements

3. Common errors:
   - "Cannot find module": Try running `npm install` again
   - "Port already in use": Change the port using `ng serve --port <new-port>`
   - "Version mismatch": Update your Node.js/npm to the required versions

## License

This project is licensed under the MIT License.
