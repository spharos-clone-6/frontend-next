import { productType } from '@/types/types';
import React from 'react'
import ProductItemRecommand from '../ui/ProductItemRecommand';

export default function ProductContainerRecommand() {
  const dummy: productType[] = [
    {
      id: 1,
      imgSrc: "/images/products/01.png",
      title: "23 SS 체리 밸류 로맨틱 텀블러 355ml",
      price: 32000,
      isBest: 0
    },
    {
      id: 2,
      imgSrc: "/images/products/01.png",
      title: "테스트2",
      price: 17000,
      isBest: 0
    }
  ];

  return (
    <div className="recommand-product-list">
      {
        dummy.map((item, idx) => (
          <ProductItemRecommand
            key={idx}
            item = {item}
          />
        ))
      }
    </div>
  )
}
