import withAuth from "../components/withAuth"
import UpdateSlideover from "../components/updateSlideover"
import QRModal from "../components/qrModal"
import {useEffect, useState} from "react"
import axios from "axios";
import { setISODay } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function orderHistory() {
  const [updateOpen,setUpdateOpen]=useState(false);
  const [openModal,setModalOpen]=useState(false);
  const [id,setID]=useState("");
  const [data,setData]=useState([]);
  useEffect(()=>{
    getOrders();
  },[])
  const getOrders=async()=>{
    await axios.get('/order').then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl mx-auto pt-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            
          </div>
          
        </div>

        {/* Products */}
        <div className="mt-6">
          <h2 className="sr-only">Products purchased</h2>

          <div className="space-y-8">
            {data.map((product) => (
              <div
                key={product.product._id}
                className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
              >
                <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-7">
                    <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                      <img
                        src={product.product.product_image}
                        className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                      />
                    </div>

                    <div className="mt-6 sm:mt-0 sm:ml-6">
                      <h3 className="text-base font-medium text-gray-900">
                        <p>{product.product.product_name}</p>
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">₹{product.product.amount}</p>
                      <p className="mt-3 text-sm text-gray-500">{product.product.Description}</p>
                      <div className="flex flex-row">
                      <button
                        className="mt-3 mr-2 flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={()=>{setModalOpen(true)}}
                      >
                        <span>View Order</span>
                      </button>
                      <button
                        className="mt-3 ml-2 flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={()=>{
                          setUpdateOpen(true);
                          setID(product.orderDetails._id)
                        }}
                      >
                        <span>Update Details</span>
                      </button>
                      </div>
                    </div>
                  </div>

                  
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                  <h4 className="sr-only">Status</h4>
                  
                  <div className="mt-6" aria-hidden="true">
                    <div className="bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `calc((${product.orderDetails.step} * 2 + 1) / 8 * 100%)` }}
                      />
                    </div>
                    <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                      <div className="text-indigo-600">Order placed</div>
                      <div className={classNames(product.orderDetails.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                        Processing
                      </div>
                      <div className={classNames(product.orderDetails.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                        Shipped
                      </div>
                      <div className={classNames(product.orderDetails.step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                        Delivered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
      <UpdateSlideover open={updateOpen} setOpen={setUpdateOpen} id={id}/>
      <QRModal open={openModal} setOpen={setModalOpen} />
    </div>
  )
}
export default withAuth(orderHistory)