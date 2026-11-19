import React, { useState } from "react";
import AlbumCard from "../components/AlbumCard";

const CatalogPage = ({ albums, onAddToCart }) => {
    
        const genres = ["All", "Jazz", "Electronic", "Rock", "Classical"];
        const [selectedGenre, setSelectedGenre] = useState("All");

        const validAlbums = albums || [];

        const filteredAlbums = selectedGenre === "All" ? validAlbums: validAlbums.filter((a) => a.genre === selectedGenre);

        return (
            <div className="catalog-container">
                <header className="catalog-hero">
                    <h1>Vinyl Collection</h1>
                    <p>Explore our curated collection of vinyl records.</p>
                </header>

            <div className="filter-bar">
                {genres.map((genre) => (
                    <button key={genre} type="button" className={`filter-pill ${selectedGenre === genre ? "active" : ""}`} onClick={() => setSelectedGenre(genre)}>{genre}</button>
                ))}
            </div>

            <div className="product-grid">
                {filteredAlbums.map((album) => (
                    <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;
