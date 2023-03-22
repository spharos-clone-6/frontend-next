import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CartItem from "../ui/CartItem";
import { DefaultValue, useRecoilState } from "recoil";
import { cartListType } from "@/types/types";
import { frozenCartListState, generalCartListState } from "../recoil/cart";
import Link from "next/link";

interface cartType {
  title: string;
}

export default function CartItemList({ title }: cartType) {
  const [cartItems, setCartItems] =
    title === "일반상품"
      ? useRecoilState<cartListType>(generalCartListState)
      : useRecoilState<cartListType>(frozenCartListState);
  const [listAllCheck, setListAllCheck] = useState(false);
  const [totalItemPrice, setTotalItemPrice] = useState<number>(0);
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState<number>(0);

  useEffect(() => {
    let check = true;
    cartItems.find((item) => item.checked === false)
      ? (check = false)
      : (check = true);
    setListAllCheck(check);
  }, [cartItems]);

  const handleCartListAllCheck = (check: boolean) => {
    setListAllCheck(!check);
    setCartItems(
      cartItems.map((item) => {
        const cartResult = { ...item };
        cartResult.checked = !check;
        return cartResult;
      })
    );
  };

  let checkedItemQuantity = 0;
  cartItems.map((item) =>
    item.checked ? (checkedItemQuantity += 1) : (checkedItemQuantity += 0)
  );

  let listPrice = 0;
  cartItems.map((item) =>
    item.checked
      ? (listPrice += item.product.price * item.quantity)
      : (listPrice += 0)
  );

  const deliveryPrice = listPrice >= 30000 || listPrice == 0 ? 0 : 3000;
  const deliveryComment =
    listPrice >= 30000
      ? "무료배송"
      : `${30000 - listPrice}원 더 담으면 무료배송`;

  useEffect(() => {
    cartItems.map((item) =>
      item.checked
        ? setTotalItemPrice(totalItemPrice + listPrice)
        : setTotalItemPrice(totalItemPrice + 0)
    );
    console.log("총가격 : ", totalItemPrice);
  }, [cartItems]);

  useEffect(() => {
    setTotalDeliveryPrice(totalDeliveryPrice + deliveryPrice);
  }, [cartItems]);

  return (
    <>
      <section id="cart-list">
        <div className="select">
          {/* 일반 / 냉동 일괄 선택 체크박스 */}
          <div className="select-items">
            <div
              className={listAllCheck ? "sbCheckBoxOn" : "sbCheckBox"}
              onClick={() => handleCartListAllCheck(listAllCheck)}
            >
              <img src="/images/icons/check.png" style={{ width: "100%" }} />
            </div>
            <p className="cart-select-btn">{title}</p>
          </div>
        </div>
        {cartItems.map((item) => (
          <CartItem item={item} key={item.product.id} title={title} />
        ))}
      </section>
      {!checkedItemQuantity ? (
        ""
      ) : (
        <div className="cart-delivery">
          <p>
            상품 {checkedItemQuantity}건 {listPrice.toLocaleString("en")}원 +
            배송비 {deliveryPrice.toLocaleString("en")}원 = 총{" "}
            {(listPrice + deliveryPrice).toLocaleString("en")}원
          </p>
          <p style={{ fontWeight: "bold" }}>{deliveryComment}</p>
          <Link href="/store_all">더 담으러 가기</Link>
        </div>
      )}
    </>
  );
}
