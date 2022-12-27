import React from 'react'
import "./index.scss"
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";

type Props = {
    menuName: string
    avgRating: number
    numberOfFavorites: number
    price: number
    menuPhoto: string
    categoryId: number
}

export default function MenuCard(props: Props): JSX.Element {
    return (
        <div className="card">
            <img src={props.menuPhoto} className="card-img-top" alt={props.menuName}/>
            <div className="card-body">
                <h5 className="card-title">{props.menuName}</h5>
                <p className="card-text">IDR {(props.price).toLocaleString('id-ID')}</p>
                <div className="ratingAndFavorite">
                    <div className="rating">
                        <p className="card-text">{props.avgRating.toFixed(2)}</p>
                        <FaStar/>
                    </div>
                    <div className="favorite">
                        <p className="card-text">{props.numberOfFavorites > 1000 ? "1K+" : props.numberOfFavorites}</p>
                        <FaHeart/>
                    </div>
                    <button className='btn btn-success'><FaShoppingCart/>Cart</button>
                </div>
            </div>
        </div>
    )
}