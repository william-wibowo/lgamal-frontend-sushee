import React from 'react'
import "./index.scss"
import { selectCartToggle, selectSelectedCart, setCartToggle } from '../../../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import CartCard from '../CartCard';
import { useDeleteAllCartsMutation, useGetCartsQuery } from '../../../features/cartSlice/cartApiSlice';

export default function CartOffCanvas(): JSX.Element {
    const dispatch = useDispatch()
    const cartToggle = useSelector(selectCartToggle)
    const selectedCart = useSelector(selectSelectedCart)
    const { data: cart, isLoading: isCartLoading } = useGetCartsQuery()

    const handleOpenCart = ((e: any) => {
        dispatch(setCartToggle(!cartToggle))
    })

    const [deleteAllCarts] = useDeleteAllCartsMutation()
    const handleDelete = () => {
        deleteAllCarts()
    }

    return (
        <div className='cart-wrapper'>
            <div className={`cart-offcanvas ${cartToggle ? "cart-open" : "cart-close"}`}>
                <div className="content">
                    <button type="button" className="btn-close btn-close-white cart-toggle" aria-label="Close" onClick={handleOpenCart}></button>
                    <h2>Ready to Order?</h2>
                    <hr/>
                    <div className="container">
                        {!isCartLoading && cart
                        ? cart.data.carts.map((val, i) => {
                            return <CartCard
                                id={val.id}
                                menu={val.menu}
                                promotion_id={val.promotion_id}
                                quantity={val.quantity}
                                menu_option={val.menu_option}
                                promotion_price={val.promotion_price}
                                key={i}
                            />
                        })
                        :<></>
                    }
                    </div>
                    <hr/>
                    <p className="total">Total Price: IDR {!isCartLoading && cart 
                        ? (cart.data.carts.reduce((cum, x) => cum+x.menu.price*x.quantity*(selectedCart.includes(x.id)?1:0), 0)).toLocaleString('id-ID')
                        : 0}</p>
                    <div className="cart-footer">
                        <button className="delete-all btn btn-danger" onClick={handleDelete}>Delete All</button>
                        <button className="order btn btn-success">Order Now!</button>
                    </div>
                </div>
            </div>
            <div className={`main-content ${cartToggle ? "cart-open" : "cart-close"}`}>
                <Outlet/>
            </div>
        </div>
    )
}