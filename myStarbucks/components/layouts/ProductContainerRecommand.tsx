import { productType } from '@/types/types';
import React from 'react'
import ProductItemRecommand from '../ui/ProductItemRecommand';

export default function ProductContainerRecommand(props: {sectionId: string, headerName: string, itemList: productType[]}) {
  const { sectionId, headerName, itemList } = props
  return (
    <section className="recommand" id={sectionId}>
      <h2>{headerName}</h2>
      <div className="recommand-product-list">
        {
          itemList.map((item: productType) => (
            <ProductItemRecommand
              key = {item.id}
              item = {item}
            />
          ))
        }
      </div>
    </section>
  )
}
