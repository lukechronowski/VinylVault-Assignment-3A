import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumDetailPage = ({ albums, onAddToCart }) => {
    
    const { albumId } = useParams();
    const [qty, setQty] = useState(1);

    const validAlbums = albums || [];
    const album = validAlbums.find((a) => a.id === albumId);

    if (!album) {
        return (
            <div className="detail-error">
                <h2>Album Not Found</h2>
                <Link className="btn btn-secondary" to="/">Return to Main Catalog</Link>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <nav className="breadcrumb">
                <Link to="/">Catalog</Link> &gt; <span>{album.title}</span>
            </nav>
            <div className="detail-grid">
                <img src={album.image} alt={album.title} className="detail-img"/>
                <div className="detail-info">
                    <span className="product-category">{album.genre}</span>
                    <h1>{album.title}</h1>
                    <h3>{album.artist}</h3>
                    <p className="product-price">${album.price.toFixed(2)}</p>
                    <p>{album.description}</p>
                    <h3>Vinyl Specifications</h3>
                    <p>Catalog Number: {album.specs.catalogNumber}</p>
                    <p>Weight: {album.specs.weight}</p>
                    <p>Speed: {album.specs.speed}</p>
                    <p>Record Label: {album.specs.label}</p>
                    <div className="stock-tag">{ (album.stock > 0) ? "✓ In Stock ({album.stock} units available)" : "Out of Stock"}</div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" min="1" max={album.stock} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(album.stock, parseInt(e.target.value, 10) || 1))) }></input>
                    </div>
                    <button className="btn btn-primary" type="button" disabled={album.stock === 0} onClick={() => onAddToCart(album, qty)}>Add {qty} to Cart</button>
                    <h3>Tracklist</h3>
                    <ol>{album.tracklist.map((track, index) => (<li key={index}>{track}</li>))}</ol>
                </div>
            </div>
        </div>
    );
};

export default AlbumDetailPage;
