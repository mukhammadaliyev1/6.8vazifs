import React, { useEffect, useRef, useState } from "react";

function Home() {
  const productsRef = useRef([]);
  const nameRef = useRef();
  const priceRef = useRef();
  const [products, setProducts] = useState([]);
  useEffect(function () {
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Server responded with error!");
      })
      .then((data) => {
        productsRef.current = data;
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name: nameRef.current.value,
      price: priceRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        productsRef.current = [...productsRef.current, data];
        setProducts([...productsRef.current]);
      })
      .catch((err) => {
        console.log(err);
      });

    nameRef.current.value = "";
    priceRef.current.value = "";
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2  w-1/3 p-5 rounded-md  mx-auto mt-5 mb-5 bg-slate-200"
        onSubmit={createProduct}
      >
        <div>
          <input
            className="border border-grey rounded-md"
            type="text"
            ref={nameRef}
            required
          />
        </div>
        <div>
          <input
            className="  border border-grey rounded-md"
            type="number"
            ref={priceRef}
          />
        </div>
        <button className="btn rounded-md bg-blue-700  w-12" type="submit">
          add
        </button>
      </form>
      <div className="flex flex-wrap   justify-center  gap-12">
        {products.length > 0 &&
          products.map((product, index) => (
            <div className="w-1/4  px-5  h-16 border 1px" key={index}>
              <h1>{product.name}</h1>
              <h3>{product.price}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
