export interface user {
  id: number;
  name: string;
  email: string;
  address?: string;
}

export interface recommandTitle {
  id: number;
  title: string;
  data: object;
}

export interface productType {
  createDate?: string;
  updateDate?: string;
  id?: number;
  productId: number;
  name: string;
  price: number;
  description?: string;
  thumbnailUrl: string;
  stock?: number;
  isBest: boolean;
  isNew: boolean;
  likeCount?: number;
  season?: string;
  bigTyep?: string;
  volume?: string;
}

export interface categoryType {
  id: number;
  name: string;
  type?: string;
  tag?: string;
}

export interface eventType {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  descriptionUrl: string;
  tag: string;
}

// // 장바구니 개별 상품(더미)
// export interface cartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   img: string;
//   isChecked?: boolean;
// }

export interface cartItemType {
  id: number;
  quantity: number;
  user: object;
  product: productType;
  deleted: boolean;
  checked: boolean;
}

export interface cartListType extends Array<cartItemType> {}

export interface modal {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface detailProductType {
  name: string;
  productId: number;
  description: string;
  price: number;
  subType: string;
  bigType: string;
  season: string;
  volume: string;
  thumbnailUrl?: string;
  isBest?: boolean;
  isNew?: boolean;
}

export interface bigCategory {
  typeName: string;
  typeCount: number;
}