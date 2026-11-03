import React from "react";
import { FaHeartCrack } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { store } from "../store";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "../data/localDb";


const WishItem = ({ item, counter }) => {
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (product) => {
      const id = localStorage.getItem("id");
      const userObj = getUserById(id);
      if (!userObj) return;

      userObj.userWishlist = (userObj.userWishlist || []).filter(
        (i) => product.id !== i.id
      );

      updateUser(id, { userWishlist: userObj.userWishlist });
      store.dispatch(removeFromWishlist({ userObj }));
      toast.success("Product removed from the wishlist!");
    };

  return (
    <tr className="hover cursor-pointer">
      <th className="text-accent-content">{ counter + 1 }</th>
      <td className="text-accent-content">{ item.title }</td>
      <td className="text-accent-content">{ item.selectedSize }</td>
      <td>
        <button className="btn btn-xs btn-error text-sm" onClick={() => removeFromWishlistHandler(item)}>
          <FaHeartCrack />
          remove from the wishlist
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
