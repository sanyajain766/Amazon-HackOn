import React, { useEffect } from "react";
import withAuth from "../components/withAuth";
import BuySlideover from "../components/buySlideover"
import { useState } from "react";
import axios from "axios";


function Home() {
  const [buyOpen,setBuyOpen]=useState(false);
  const [items,setItems]=useState([]);
  const [id,setId]=useState("");
  const [currCity,setCurrCity]=useState("");
  useEffect(()=>{
    getItems();
    
  },[])
  const getItems=async()=>{
    await axios.get('/product').then((res)=>{
      setItems(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return(
<div className="bg-white">
      <main>
        <div className="flex flex-col border-b border-gray-200 lg:border-0">
                    <div className="relative">
            <div aria-hidden="true" className="hidden absolute w-1/2 h-full bg-gray-100 lg:block" />
            <div className="relative bg-gray-100 lg:bg-transparent">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
                <div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
                  <div className="lg:pr-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                      Focus on what matters
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                      All the charts, datepickers, and notifications in the world can't beat checking off some items on
                      a paper card.
                    </p> 
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-02-hero-half-width.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div>

        {/* Trending products */}
        <section aria-labelledby="trending-heading" className="bg-white">
          <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:py-32 lg:px-8">
            <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
              <h2 id="trending-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                Trending products
              </h2>
              
            </div>

            <div className="mt-8 relative">
              <div className="relative w-full overflow-x-auto">
                <ul
                  role="list"
                  className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8 sm:grid-cols-1"
                >
                  {items.map((product) => (
                    <li key={product._id} className="w-64 inline-flex flex-col text-center lg:w-auto">
                      <div className="group relative">
                        <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                          <img
                            src={product.product_image}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                          />
                        </div>
                        <div className="mt-6">
                          <p className="text-sm text-gray-500"> Sold by {product.sellarName}</p>
                          <h3 className="mt-1 font-semibold text-gray-900">
                           
                              <span className="absolute inset-0" />
                              {product.product_name}
                           
                          </h3>
                          <p className="mt-1 text-green-900">₹{product.amount}</p>
                          
                        </div>
                      </div>
                      <div className="my-5">
                          
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-3"
                          onClick={() => {
                            setBuyOpen(true);
                            console.log(buyOpen)
                            setId(product._id)
                            setCurrCity(product.sellerCity)
                          }}
                        >
                        Buy 
                        </button>
                          </div>
                          
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            
          </div>
        </section>
           
      </main>
      <BuySlideover open={buyOpen} setOpen={setBuyOpen} datas={id} city={currCity}/>        
      
    </div>
  );
}

export default withAuth(Home);
