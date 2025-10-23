# Navbar Implementation Guide

## Overview

Your navbar is now implemented using a clean, modular architecture with zero code duplication. This allows you to easily use the same navbar across all pages in both languages.

## File Structure

```
san-carlos-website/
├── navbar-en.html          # English navbar HTML (no scripts)
├── navbar-es.html          # Spanish navbar HTML (no scripts)
├── navbar-styles.css       # All navbar CSS
├── navbar-scripts.js       # All navbar JavaScript
├── en/
│   ├── index.html
│   └── places-to-stay/
│       └── index.html
└── es/
    ├── index.html
    └── donde-hospedarse/
        └── index.html
```

## What Each File Does

### navbar-en.html
- Contains ONLY the navbar HTML structure
- English menu items (Home, Discover, Explore, Places to Stay, Contact)
- Links to Spanish version
- NO JavaScript included

### navbar-es.html
- Contains ONLY the navbar HTML structure
- Spanish menu items (Inicio, Descubre, Explora, Dónde Hospedarse, Contacto)
- Links to English version
- NO JavaScript included

### navbar-styles.css
- All styling for navbar (both languages)
- Responsive design
- Animations and transitions
- Dropdown styles
- Mobile menu styles

### navbar-scripts.js
- `toggleMenu()` - Opens/closes mobile menu
- `closeMenu()` - Closes mobile menu
- `saveLanguagePreference()` - Saves language choice to localStorage
- Scroll effect handler (adds 'scrolled' class)
- Dropdown toggle for mobile
- Auto-runs when DOM loads

## How to Use on Any Page

### For English Pages:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Page Title</title>

    <!-- Navbar CSS -->
    <link rel="stylesheet" href="/navbar-styles.css">

    <!-- Your page styles -->
    <style>
        /* Your CSS here */
    </style>
</head>
<body>
    <!-- Navbar placeholder -->
    <div id="navbar-placeholder"></div>

    <!-- Your content here -->

    <!-- Load navbar HTML -->
    <script>
        fetch('/navbar-en.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-placeholder').innerHTML = data;
            })
            .catch(error => console.error('Error loading navbar:', error));
    </script>

    <!-- Load navbar functionality -->
    <script src="/navbar-scripts.js"></script>

    <!-- Your page scripts -->
    <script>
        // Your page-specific JavaScript
    </script>
</body>
</html>
```

### For Spanish Pages:

Same structure, just change the navbar HTML path:

```html
<!-- Load navbar HTML -->
<script>
    fetch('/navbar-es.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
</script>
```

## Key Benefits

### 1. Update Once, Works Everywhere
- Change menu in `navbar-en.html` → all English pages update
- Change styles in `navbar-styles.css` → all pages update
- Fix a bug in `navbar-scripts.js` → all pages fixed

### 2. No Code Duplication
- Functions defined once in `navbar-scripts.js`
- Loaded once, cached by browser
- No duplicate scroll listeners
- No duplicate function definitions

### 3. Easy to Maintain
- Clear separation of concerns:
  - HTML files = Structure only
  - CSS file = Styling only
  - JS file = Functionality only
- Each file has ONE job
- Easy to debug

### 4. Better Performance
- Browser caches JS and CSS files
- No duplicate event listeners
- Cleaner code = faster execution
- Files load in parallel

## What Was Fixed

1. **Removed duplicate JavaScript** from both HTML pages
   - `toggleMenu()` / `closeMenu()` now only in navbar-scripts.js
   - `saveLanguagePreference()` now only in navbar-scripts.js
   - Scroll listeners no longer duplicated

2. **Cleaned up navbar-es.html**
   - Removed all `<script>` tags (lines 68-113)
   - Removed inline `onclick="closeMenu()"` handlers
   - Now matches clean structure of navbar-en.html

3. **Added navbar placeholders** to both index pages
   - `<div id="navbar-placeholder"></div>` added to body

4. **Standardized paths**
   - All pages now use absolute paths (`/navbar-*.html`)
   - Consistent across all files

5. **Removed duplicate functions** from page scripts
   - No more duplicate `toggleMenu()` / `closeMenu()`
   - No more duplicate navbar scroll effects

## Important Notes

- **Always use absolute paths** (`/navbar-en.html` NOT `../navbar-en.html`)
- **Don't modify navbar-scripts.js** on individual pages - it's shared!
- **Add the navbar placeholder** (`<div id="navbar-placeholder"></div>`) before any content
- **Load navbar scripts** at the end of body, before your page-specific scripts
- **The navbar-scripts.js file works for BOTH languages** - don't duplicate it!

## Adding New Pages

To add the navbar to a new page:

1. Add CSS link in `<head>`:
   ```html
   <link rel="stylesheet" href="/navbar-styles.css">
   ```

2. Add placeholder at start of `<body>`:
   ```html
   <div id="navbar-placeholder"></div>
   ```

3. Add scripts at end of `<body>`:
   ```html
   <script>
       fetch('/navbar-en.html')  <!-- or /navbar-es.html -->
           .then(response => response.text())
           .then(data => {
               document.getElementById('navbar-placeholder').innerHTML = data;
           })
           .catch(error => console.error('Error loading navbar:', error));
   </script>
   <script src="/navbar-scripts.js"></script>
   ```

That's it! The navbar will work perfectly.

## Troubleshooting

### Navbar not appearing?
- Check that `<div id="navbar-placeholder"></div>` exists
- Check console for fetch errors
- Verify paths are correct (`/navbar-*.html` not `navbar-*.html`)

### Dropdown not working on mobile?
- Make sure `navbar-scripts.js` is loaded
- Check that there are no duplicate script definitions
- Verify navbar HTML loaded successfully

### Scroll effect not working?
- Ensure `navbar-scripts.js` is loaded after navbar HTML
- Check that navbar exists in DOM before script runs
- Look for JavaScript errors in console

### Language switcher not saving preference?
- Check browser localStorage is enabled
- Verify `saveLanguagePreference()` is being called
- Check `navbar-scripts.js` is loaded
