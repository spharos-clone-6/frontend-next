/** @jsxImportSource @emotion/react */

import CartItemList from "@/components/layouts/CartItemList";
import {
  frozenCartListState,
  generalCartListState,
} from "@/components/recoil/cart";
import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import CartControlBar from "@/components/widgets/CartControlBar";
import { cartListType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CartEmpty from "../components/widgets/CartEmpty";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import Config from "@/configs/config.export";

export default function cart() {
  const { baseUrl } = Config();
  const [frozenCart, setFrozenCart] =
    useRecoilState<cartListType>(frozenCartListState);
  const [generalCart, setGeneralCart] =
    useRecoilState<cartListType>(generalCartListState);
  const [isLoading, setIsLoading] = useState(true);
  const buttonContainer = css`
    display: flex;
    gap: 15px;
    padding: 0px 30px;
    align-items: center;
    justify-content: space-between;
  `;

  const submitPrice = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: bolder;
    padding: 20px 30px 0px 30px;
  `;

  // 데이터 불러오기
  const accesstoken =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2Nzk2NjAwNDQsInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCI6dHJ1ZSwiZW1haWwiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiJ9.vF5m5sIUztpsuNvqGcswMf84eC2uuwZUzNlCqFNZNry4gk6thxKSz5RBmg-3klBBeRQiyQwI45vaFwex3kApOg";
  async function fetchGeneralData() {
    const generalResult = await axios.get(`${baseUrl}/api/cart/my_cart`, {
      headers: {
        Authorization: accesstoken,
      },
    });
    console.log("일반 상품 :", generalResult);
    setGeneralCart(generalResult.data);
  }
  async function fetchFrozenData() {
    const frozenResult = await axios.get(`${baseUrl}/api/cart/my_cart/ice`, {
      headers: {
        Authorization: accesstoken,
      },
    });
    console.log("냉동 상품 :", frozenResult);
    setFrozenCart(frozenResult.data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchGeneralData();
    fetchFrozenData();
  }, []);

  const totalCart = generalCart.length + frozenCart.length;

  // 체크박스 선택한 상품 수량
  let checkedItemQuantity = 0;
  frozenCart.map((item) =>
    item.checked ? (checkedItemQuantity += 1) : (checkedItemQuantity += 0)
  );
  generalCart.map((item) =>
    item.checked ? (checkedItemQuantity += 1) : (checkedItemQuantity += 0)
  );

  // 체크박스 선택한 상품 총 가격(배송비 미포함)
  let TotalPrice = 0;
  let frozenPrice = 0;
  let generalPrice = 0;
  frozenCart.map((item) =>
    item.checked
      ? (frozenPrice += item.product.price * item.quantity)
      : (frozenPrice += 0)
  );
  generalCart.map((item) =>
    item.checked
      ? (generalPrice += item.product.price * item.quantity)
      : (generalPrice += 0)
  );
  TotalPrice = frozenPrice + generalPrice;

  const frozenDelivery = frozenPrice > 30000 || frozenPrice === 0 ? 0 : 3000;
  const generalDelivery = generalPrice > 30000 || generalPrice === 0 ? 0 : 3000;

  const deliveryPrice = frozenDelivery + generalDelivery;

  return (
    <>
      {isLoading && <div style={{ padding: "300px 150px" }}>Loading</div>}
      {!isLoading &&
        (totalCart === 0 ? (
          <CartEmpty />
        ) : (
          <div className="cart-container">
            <section id="cart-header">
              <p className="title">장바구니</p>
              <CartControlBar />
            </section>

            <CartItemList title={"일반상품"} />
            <CartItemList title={"냉동상품"} />

            {/* 최종 금액 */}
            <section id="total-cart-price">
              <div>
                <div className="title-total-price">총 주문 금액</div>
                <div className="prices">
                  <div className="cart-price">
                    <p>상품 금액</p>
                    <p className="price">{TotalPrice.toLocaleString("en")}원</p>
                  </div>
                  <div className="cart-price">
                    <p>할인 금액</p>
                    <p className="price">0원</p>
                  </div>
                  <div className="cart-price">
                    <p>배송비</p>
                    <p className="price">
                      {deliveryPrice.toLocaleString("en")}원
                    </p>
                  </div>
                </div>
                <div className="total-price">
                  <p>최종 결제 금액</p>
                  <p className="price">
                    {(TotalPrice + deliveryPrice).toLocaleString("en")}원
                  </p>
                </div>

                {/* 안내문 */}
                <div className="notice">
                  <div className="notice-box">
                    장바구니에는 최대 20개까지 담을 수 있으며, 담긴 상품은 최대
                    2개월간 보관됩니다.
                    <br />
                    가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.
                  </div>
                </div>
              </div>
            </section>
            <BottomFixedContainer>
              <div css={submitPrice}>
                <div>
                  총{" "}
                  <span style={{ color: "var(--color-primary)" }}>
                    {checkedItemQuantity}
                  </span>
                  건 / 20건
                </div>
                <div style={{ fontSize: "20px" }}>
                  {(TotalPrice + deliveryPrice).toLocaleString("en")}원
                </div>
              </div>
              <div css={buttonContainer}>
                <Button
                  btnType="button"
                  btnEvent={() => alert("선물하기")}
                  type="white"
                >
                  선물하기
                </Button>
                <Button btnType="button" btnEvent={() => alert("구매하기")}>
                  구매하기
                </Button>
              </div>
            </BottomFixedContainer>
          </div>
        ))}
    </>
  );
}