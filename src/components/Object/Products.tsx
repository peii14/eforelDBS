import React, { Dispatch, SetStateAction, useMemo } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Button from "@/components/Object/Button";

interface ProductsProps {
  state: any;
  dispatch?: Dispatch<any>;
}

const Products = ({ state = {}, dispatch }: ProductsProps) => {
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);

    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <div className="col-span-5">
      <table className="min-w-full  ">
        <thead className="border-y-2 border-sec sticky">
          <tr>
            <th className="px-5 text-left">Full Name</th>
            <th className="text-left px-5">Quotation </th>
            <th className="text-left px-5">Quantity</th>
            <th className="text-left px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr
              key={item.name}
              className="border-b-2 border-sec border-double border-opacity-20"
            >
              <td className="px-5">{item.name}</td>
              <td className="p-5">
                Rp {Intl.NumberFormat("en-US").format(item.quotationValue)}
              </td>
              <td className="p-5">
                <select
                  value={item.quantity}
                  className="cursor-pointer border p-3 bg-background "
                  onChange={(e) => updateCartHandler(item, e.target.value)}
                >
                  {[...Array.from({ length: 100 }, (_, i) => i + 1)].map(
                    (element, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    )
                  )}
                </select>
              </td>
              <td className=" p-5 flex flex-row ">
                <Link href={`/eforel/admin/edit-user`}>
                  <a>
                    <Button btn="Edit" />
                  </a>
                </Link>
                <button
                  onClick={() => removeItemHandler(item)}
                  className="default-button"
                  type="button"
                >
                  <div className="ml-3 border-2 duration-300 hover:bg-primary-400 border-primary rounded-full px-3 py-1">
                    Delete
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
