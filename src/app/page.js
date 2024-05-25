'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import Sidebar from "./components/Sidebar";

async function getCard() {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos?');
  if (!res.ok) {
    throw new Error('Cannot fetch');
  }
  return res.json();
}

export default function Home() {
  const [cards, setCards] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initCards() {
      try {
        setLoading(true);
        const data = await getCard();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    initCards();
  }, [selectedPage]);

  function toggleSidebar() {
    setSideBar(!sideBar);
  }

  useEffect(() => {
    if (sideBar) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [sideBar]);

  function addCardToCart(item) {
    const newItem = {
      id: item.id,
      title: item.title,
      url: item.url,
      quantity: 1,
      price: 999,
    };
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          item.id === orderItem.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        );
      } else {
        return [...prevOrder, newItem];
      }
    });
  }

  function handlePageClick(e) {
    const pageNumber = e.selected + 1;
    setSelectedPage(pageNumber);
  }

  function updateOrder(newOrder) {
    setOrder(newOrder);
  }

  function clearAll() {
    setOrder([]);
  }

  const filteredCards = cards.filter((item) =>
    item.albumId === selectedPage && item.title.toLowerCase().includes(search.toLowerCase())
  );

  function clearSearch() {
    setSearch('');
  }

  return (
    <main className="container m-2 w-3/4 mx-auto max-[1191px]:w-full px-5">
      {sideBar && (
        <Sidebar ordervalue={order} clicksidebar={toggleSidebar} updateOrder={updateOrder} clearall={clearAll} />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Card Shop</h1>
        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="search p-3 text-white max-[480px]:hidden"
            placeholder="⌕ Search for name"
          />
          <button onClick={toggleSidebar} className="clear p-3 rounded-xl">
            <Image src="/shopping-bag (3).png" width={30} height={30} alt="cart" />
          </button>
        </div>
      </div>
      <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="search p-3 text-white w-full mt-5 min-[10px]:hidden"
            placeholder="⌕ Search for name"
          />
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-white">Choose card</h1>
        <hr />
        <div className="flex">
          <button onClick={clearSearch} className="clear2 text-white p-3 rounded-xl text-2xl">
            Clear
          </button>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-6 gap-4 max-[1191px]:grid-cols-6 max-[900px]:grid-cols-3 max-[480px]:grid-cols-1">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          filteredCards.map((item) => (
            <div className="place text-center relative h-full mb-12 " key={item.id}>
              <div className="flex justify-center items-center w-full">
                <Image className="place-img" priority={true} src={item.url} width={150} height={150} alt={item.thumbnailUrl} />
              </div>
              <div id="bg-card" className="h-48 rounded-xl w-full lg: h-44  max-[480px]:h-48">
                <p style={{ fontSize: '14px' }} className="font-bold mt-2 h-20 text-white overflow-hidden max-[900px]:h-18 max-[480px]:h-14">
                  {item.title}
                </p>
                <p className="price mt-2">$ 999 . - card</p>
                <button
                  id="btn-card"
                  onClick={() => addCardToCart(item)}
                  className="mt-2 text-white rounded-md inline-flex justify-center items-center"
                >
                  <span className="inherit mr-2">
                    <Image priority={true} src="/shopping-bag (3).png" width={15} height={15} alt="cart" />
                  </span>
                  ADD TO CARD
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ReactPaginate
        className="flex justify-center w-full"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageCount={100}
        pageClassName="eachpage"
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        breakLinkClassName="dot"
        previousClassName="eachpage"
        nextClassName="eachpage"
        onPageChange={handlePageClick}
      />
    </main>
  );
}
