import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import axios from "../node_modules/axios/index";

export default function buySlideover({ open, setOpen,datas,city }) {
  const [data, setData] = useState([]);
  const handlechange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  data["productId"]=datas;
  data["currCity"]=city
  data["status"]="Order Placed"
  data["step"]=0
  console.log(data);
  const buyItem=async(e)=>{
    e.preventDefault();
    await axios.post('/buyProduct',data).then((res)=>{
        console.log("Order placed");
    })
    setOpen(false);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div className="h-0 flex-1 overflow-y-auto">
                    <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          {" "}
                          Buy Item{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300">
                          Get started by filling in the information below to buy
                          the product.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-900"
                            >
                              {" "}
                              Name{" "}
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className=" h-10 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="quantity"
                              className="block text-sm font-medium text-gray-900"
                            >
                              {" "}
                              Quantity{" "}
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="quantity"
                                id="quantity"
                                className=" h-10 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={handlechange}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-900 "
                            >
                              {" "}
                              Address{" "}
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="address"
                                name="shippingAddress"
                                rows={4}
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={""}
                                onChange={handlechange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label
                              htmlFor="shippingCity"
                              className="block text-sm font-medium text-gray-900"
                            >
                              {" "}
                              City{" "}
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="shippingCity"
                                id="shippingCity"
                                className=" h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={handlechange}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="pincode"
                              className="block text-sm font-medium text-gray-900"
                            >
                              {" "}
                              Pin Code{" "}
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="pincode"
                                id="pincode"
                                className=" h-10 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                              />
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end px-4 py-4">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                     onClick={buyItem}
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
