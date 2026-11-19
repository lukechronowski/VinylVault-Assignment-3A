# VinylVault — Indie Record Online Store

VinylVault is a React-based online record store where users can browse and order vinyl albums.

## 1. Project Setup and Execution Instructions

### Prerequisites

- Node.js version 21 or newer
- npm
- Git
- VS Code or another code editor
- web browser

### Installation and Execution

**1. Clone the repository:**

```bash
git clone https://github.com/lukechronowski/VinylVault-Assignment-3A.git
```

**2. Navigate into the project:**

```bash
cd VinylVault-Assignment-3A
```

**3. Install dependencies:**

```bash
npm install
```

**4. Start the development server:**

```bash
npm run dev
```

**5. Verify the application:**

Open the local URL displayed in the terminal, typically `http://localhost:5173/`. Confirm that the VinylVault catalog loads and that navigation between the catalog, album details, and checkout works.

Press `Ctrl + C` in the terminal to stop the server.

### Directory Overview

The project root contains `README.md`, `package.json`, `index.html`, and `vite.config.js` for documentation and application configuration. The `src/components/` directory contains reusable components including `Navbar.jsx`, `AlbumCard.jsx`, and `CartDrawer.jsx`. The `src/pages/` directory contains `CatalogPage.jsx`, `AlbumDetailPage.jsx`, and `CheckoutPage.jsx`, while `src/data/albums.js` stores the provided vinyl album dataset. The `src/App.jsx` file manages shared cart state and routing, `src/main.jsx` initializes React with `BrowserRouter`, and `src/styles.css` contains the application's styling.

## 2. React Component Hierarchy and Architectural Design

### Component Tree

```text
<BrowserRouter> — src/main.jsx
│   State: None
│   Props: None
│   Purpose: Enables React Router navigation.
│
└── <App> — src/App.jsx
    │   State:
    │     cart [Array<Object>]
    │       Stores album data and quantities.
    │     isCartOpen [Boolean]
    │       Controls cart drawer visibility.
    │
    │   Props: None
    │
    │   Callbacks:
    │     handleAddToCart(album, quantity)
    │     handleUpdateQuantity(albumId, delta)
    │     handleRemoveFromCart(albumId)
    │     handleClearCart()
    │
    ├── <Navbar> — src/components/Navbar.jsx
    │   State: None
    │   Props:
    │     cartCount [Number]
    │     onOpenCart [Function]
    │   Event:
    │     onClick → onOpenCart()
    │   Purpose:
    │     Sticky navigation with catalog link
    │     and synchronized cart quantity badge.
    │
    ├── <Routes> — React Router
    │   State: None
    │
    │   ├── Route: "/"
    │   │   └── <CatalogPage>
    │   │       File: src/pages/CatalogPage.jsx
    │   │       State:
    │   │         selectedGenre [String]
    │   │           Currently selected genre.
    │   │       Props:
    │   │         albums [Array<Object>]
    │   │         onAddToCart [Function]
    │   │       Event:
    │   │         setSelectedGenre(genre)
    │   │       Purpose:
    │   │         Filter and display albums.
    │   │
    │   │       └── <AlbumCard> (repeated)
    │   │           File: src/components/AlbumCard.jsx
    │   │           State: None
    │   │           Props:
    │   │             album [Object]
    │   │             onAddToCart [Function]
    │   │           Event:
    │   │             onClick → onAddToCart(album)
    │   │           Purpose:
    │   │             Displays album image, title,
    │   │             artist, genre, and price.
    │   │
    │   ├── Route: "/album/:albumId"
    │   │   └── <AlbumDetailPage>
    │   │       File: src/pages/AlbumDetailPage.jsx
    │   │       State:
    │   │         qty [Number]
    │   │           Selected purchase quantity.
    │   │       Props:
    │   │         albums [Array<Object>]
    │   │         onAddToCart [Function]
    │   │       Hook:
    │   │         useParams()
    │   │       Event:
    │   │         onClick → onAddToCart(album, qty)
    │   │       Purpose:
    │   │         Displays album specifications,
    │   │         tracklist, stock, and quantity.
    │   │
    │   └── Route: "/checkout"
    │       └── <CheckoutPage>
    │           File: src/pages/CheckoutPage.jsx
    │           State:
    │             formData [Object]
    │               Controlled checkout inputs.
    │             isSubmitted [Boolean]
    │               Controls order confirmation.
    │           Props:
    │             cart [Array<Object>]
    │             onClearCart [Function]
    │           Events:
    │             handleChange(event)
    │             handleSubmit(event)
    │           Purpose:
    │             Validates checkout information,
    │             displays totals, and confirms
    │             successful orders.
    │
    └── <CartDrawer>
        File: src/components/CartDrawer.jsx
        State: None
        Props:
          isOpen [Boolean]
          cart [Array<Object>]
          onClose [Function]
          onUpdateQuantity [Function]
          onRemove [Function]
        Hook:
          useNavigate()
        Events:
          onClick → onClose()
          onClick → onUpdateQuantity(albumId, 1)
          onClick → onUpdateQuantity(albumId, -1)
          onClick → onRemove(albumId)
          handleProceedToCheckout()
        Purpose:
          Slide-over cart displaying albums,
          quantities, subtotal, and checkout.
```
### Architectural Summary

The `App.jsx` component owns the shared cart state and passes data and callback functions to child components through props. `CatalogPage`, `AlbumDetailPage`, and `CheckoutPage` manage their own local state using `useState`. React Router handles navigation between the catalog, album details, and checkout pages.
