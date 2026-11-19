import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ album, onAddToCart }) => {

  if (!album) return null;
  
  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/album/${album.id}`}><img
          className="product-image" src={album.image} alt={album.title} loading="lazy"></img>
      </Link>
      <div className="product-body">
        <span className="product-category">{album.genre}</span>
        <h3 className="product-title">
          <Link to={`/album/${album.id}`}>{album.title}</Link>
        </h3>
        <p>{album.artist}</p>
        <p className="product-price">${album.price.toFixed(2)}</p>
        <button className="btn btn-secondary btn-block" type="button" onClick={() => onAddToCart(album)}>Add to Cart
        </button>
      </div>
    </article >
  );
};

export default AlbumCard;
