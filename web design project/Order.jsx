import React, { useState, useEffect } from 'react';
import products from '/src/data/products.js';
import OrderRow from '/src/modules/OrderRow.jsx';

function Order() {


  let [runningTotal, setRunningTotal] = useState(0);

   
  const handleSubtotalChangePlus = (subtotal) => {
    setRunningTotal(prevTotal => prevTotal + subtotal);
  };
  const handleSubtotalChangeMinus = (subtotal) => {
    setRunningTotal(prevTotal => prevTotal - subtotal);
  };

  return (
    <>
         <h2>Order Page</h2>
        <article>
          <table>
          <caption>Order something!!</caption>
            <thead>
            <tr>
              <th>Company</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Totals</th>
            </tr>
            </thead>
            <tbody>
          {products.map((product, i) =>
           <OrderRow
              product={product}
              key={i}
              onSubtotalChangePlus={handleSubtotalChangePlus}
              onSubtotalChangeMinus={handleSubtotalChangeMinus}
            />
          )}
          
            </tbody>
            <tfoot><tr><td></td><td></td><td></td><td><strong>Grand Total: </strong>
            </td><td>{runningTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}</td></tr></tfoot>  
          </table>
        </article>
      
    </>
  )
}

export default Order;
