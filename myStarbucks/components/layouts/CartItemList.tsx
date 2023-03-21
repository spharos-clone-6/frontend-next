import React, { useEffect, useState } from "react";
import CartItem from "../ui/CartItem";
import { useRecoilState } from "recoil";
import axios from "axios";
import { cartItem, IcartList } from "@/types/types";
import CartControlBar from "../widgets/CartControlBar";
import { frozenCartListState, generalCartListState } from "../recoil/cart";

export default function CartItemList(props: { title: string }) {
  const [cartItems, setCartItems] =
    props.title === "일반상품"
      ? useRecoilState<IcartList>(generalCartListState)
      : useRecoilState<IcartList>(frozenCartListState);
  const [listAllCheck, setListAllCheck] = useState(false);

  useEffect(() => {
    let check = true;
    cartItems.find((item) => item.isChecked === false)
      ? (check = false)
      : (check = true);
    setListAllCheck(check);
  }, [cartItems]);

  const handleCartListAllCheck = (check: boolean) => {
    setListAllCheck(!check);
    setCartItems(
      cartItems.map((a) => {
        const cartResult = { ...a };
        cartResult.isChecked = !check;
        return cartResult;
      })
    );
  };

  return (
    <>
      <section id="cart-list">
        <div className="select">
          {/* 일반 / 냉동 일괄 선택 체크박스 */}
          <div className="select-items">
            <div
              className={listAllCheck ? "sbCheckBoxOn" : "sbCheckBox"}
              onClick={() => handleCartListAllCheck(listAllCheck)}
            ></div>
            <p className="cart-select-btn">{props.title}</p>
          </div>
        </div>
        {cartItems.map((item) => (
          <CartItem item={item} key={item.id} title={props.title} />
        ))}
      </section>
      <div className="cart-delivery">
        <p>상품 {cartItems.length}건 326,000원 + 배송비 0원 = 총 326,000원</p>
        <p>무료배송</p>
        <a href="">더 담으러 가기</a>
      </div>
    </>
  );
}
