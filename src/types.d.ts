export interface Product {
  id: string
  title: string
  price: number
  image: string
  description: string
  category?: string
  rating?: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  qty: number
}
