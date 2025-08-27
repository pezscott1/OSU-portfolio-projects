import React, {useState} from "react";
import { FaPlus,  FaMinus  } from "react-icons/fa";

function OrderQuantity ({product, onSubtotalChangePlus, onSubtotalChangeMinus }) {

    const [quantity, setQuantity] = useState(0);


    const handleQuantityChangePlus = (newQuantity) => {
    setQuantity(newQuantity);
    onSubtotalChangePlus(product.price);
    };

    const handleQuantityChangeMinus = (newQuantity) => {
    setQuantity(newQuantity);
    onSubtotalChangeMinus(product.price);
    
    };
 
    return (
        <>
            <td className="clicker"><FaMinus onClick={() => {if (quantity !== 0) {handleQuantityChangeMinus(quantity - 1)}}}/>
            &nbsp;{quantity}&nbsp; <FaPlus onClick={() => { if (quantity < 10) {handleQuantityChangePlus(quantity + 1)}}}/></td>
            <td>{(product.price * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}</td>
        </>
    )
}

export default OrderQuantity;