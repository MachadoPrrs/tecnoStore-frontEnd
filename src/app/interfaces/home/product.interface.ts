export interface Products {
  status: string;
  results: number;
  data: Data;
}

export interface Data {
  products: Product[];
}

export interface Product {
  ratingsAverage: number;
  photo: string;
  _id: string;
  name: string;
  fabricante: string;
  descripcion: string;
  price: string;
  category: string;
}
