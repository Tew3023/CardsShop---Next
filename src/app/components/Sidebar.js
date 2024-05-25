'use client';
import Image from "next/image";

export default function Sidebar({ clicksidebar, ordervalue, updateOrder, clearall }) {
  function plusQuantity(id, quantity) {
    updateOrder(ordervalue.map(item => {
      if (item.id === id) {
        return { ...item, quantity: quantity + 1 };
      }
      return item;
    }));
  }

  function minusQuantity(id, quantity) {
    const updatedOrder = ordervalue.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(quantity - 1, 0);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    updateOrder(updatedOrder);
  }

  const totalPrice = ordervalue.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
  const totalQuantity = ordervalue.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="sidebar fixed z-10 right-0 top-0 h-full w-1/3 shadow-lg transition ease-in-out delay-500 max-[480px]:w-full">
      <div className="relative bg-black z-0"></div>
      <div className="absolute inset-0">
        <div className="flex justify-between items-center px-5 mt-5">
          <h1 className="text-3xl font-bold text-white">Cart</h1>
          <button onClick={clicksidebar} className="clear px-3 py-2 text-white rounded-xl">
            ☓
          </button>
        </div>
        <button onClick={clearall} className="underline text-gray-600 mb-4 underline-offset-1 text-white px-5">Clear all</button>
        <div className="grid grid-cols-3 px-5">
          <p className="text-white">Item</p>
          <p className="text-white">Qty</p>
          <p className="text-end text-white">Price</p>
        </div>
        <div className="h-3/5 overflow-auto px-5 max-[900px]:h-2/3 max-[480px]:h-3/5">
          {ordervalue.length > 0 ? (
            ordervalue.map(item => (
              <div key={item.id} className="mb-5 mt-2">
                <div className="grid grid-cols-3 mb-1">
                  <Image priority={true} src={item.url} width={50} height={50} alt={item.title} />
                  <p className="text-white">{item.title}</p>
                  <p className="text-end text-white">$ {item.price}</p>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => plusQuantity(item.id, item.quantity)} className="btn2 w-1/4 rounded-md text-white mx-1">+</button>
                  <button className="btn2 w-3/4 rounded-md text-white mx-1">{item.quantity}</button>
                  <button onClick={() => minusQuantity(item.id, item.quantity)} className="btn2 w-1/4 rounded-md text-white mx-1">-</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center mt-5">No orders</p>
          )}
        </div>
        <div className="summary px-5 mt-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white">Total Items</p>
            <p className="text-white">{totalQuantity}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-white">Total Price</p>
            <p className="text-white">$ {totalPrice}</p>
          </div>
          <button className="text-center bg-red-400 rounded-xl w-full text-white py-2 mt-5">Continue to Payment</button>
        </div>
      </div>
    </div>
  );
}
