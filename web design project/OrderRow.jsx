import OrderQuantity from "./OrderQuantity";
import React from "react";


function OrderRow({ product, onSubtotalChangePlus, onSubtotalChangeMinus }) {

    
    return (
        <>
        <tr>
            <td>{product.company}</td>
            <td>{product.product}</td>
            <td>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}</td>
            <OrderQuantity product={product} onSubtotalChangePlus={onSubtotalChangePlus} onSubtotalChangeMinus={onSubtotalChangeMinus}/>
        </tr>
        </>
    );
}

export default OrderRow;