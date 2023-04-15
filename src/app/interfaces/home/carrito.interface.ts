export interface Carritos {
  status: string;
  results: number;
  data: Data;
}

export interface Data {
  carritos: Carrito[];
}

export interface Carrito {
  photo: string;
  _id: string;
  name: string;
  fabricante: string;
  descripcion: string;
  price: string;
  category: string;
  user: string;
}
