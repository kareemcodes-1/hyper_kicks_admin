export type Collection = {
    readonly _id: string;
    name: string;
    description: string;
    image: string;
}

export type Product = {
    readonly _id: string;
    collectionId: string;
    name: string;
    description: string;
    price: number,
    images: string[];
    sizes: string[];
    inStock: boolean;
}

export type User = {
    readonly _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
}

export type Customer = {
    userId: string;
    name: string;
    email: string;
}


export type Order = {
    _id: string;
    userId: User;
    products: {
        productId: Product;
        quantity: number;
    }[];    
    totalAmount: number;
    createdAt: string;
    paymentInfo: {
      id: string;
      gateway: string;
      status: string;
    };
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  
