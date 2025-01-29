import {create} from "zustand";
import { Collection, Customer, Order, Product, User } from "../types/type";

type State = {
    adminInfo: User | null;
    products: Product[];
    customers: Customer[];
    orders: Order[];
    collections: Collection[];
    setProducts: (data: Product[]) => void;
    setCollections: (data: Collection[]) => void;
    setCustomers: (data: Customer[]) => void;
    setOrders: (data: Order[]) => void;
    logout: () => void;
    editingMode: boolean;
    editingCollection: null | Collection;
    editCollection: (collection: Collection | null, mode: boolean) => void;
    editingProduct: null | Product;
    editProduct: (product: Product | null, mode: boolean) => void;
    openCollectionDialog: boolean;
    setOpenCollectionDialog: (value: boolean) => void;
    setCredientials: (data: User) => void;
    openProductDialog: boolean;
    setOpenProductDialog: (value: boolean) => void;
}

const storedUser = localStorage.getItem('adminInfo');

export const useStore = create<State>((set) => ({
    adminInfo: storedUser ? JSON.parse(storedUser) : null,
    products: [],
    customers: [],
    orders: [],
    collections: [],
    editingMode: false,
    openCollectionDialog: false,
    openProductDialog: false,
    editingCollection: null,
    editingProduct: null,
    setProducts(data) {
        return set(() => ({
            products: [...data]
        }))
    },
    setOrders(data) {
        return set(() => ({
            orders: [...data]
        }))
    },
    setCustomers(data) {
        return set(() => ({
            customers: [...data]
        }))
    },
    setCollections(data) {
        return set(() => ({
            collections: [...data]
        }))
    },
    setCredientials: (data) => (
        set((state) => {
            localStorage.setItem('adminInfo', JSON.stringify(data));
            return {
                adminInfo: state.adminInfo = data,
            }
        })
    ),
    logout() {
        return set(() => {
            localStorage.removeItem('adminInfo');
            return {
                adminInfo: null,
            }
        })
    },
    setOpenCollectionDialog(value) {
        return set((state) => ({
            openCollectionDialog: state.openCollectionDialog = value,
        }))
    },
    setOpenProductDialog(value) {
        return set((state) => ({
            openProductDialog: state.openProductDialog = value,
        }))
    },
    editCollection(collection, mode) {
        return set((state) => ({
            openCollectionDialog: mode,
            editingMode: state.editingMode = mode,
            editingCollection: state.editingCollection = collection,
        }))
    },

    editProduct(product, mode) {
        return set((state) => ({
            openProductDialog: mode,
            editingMode: state.editingMode = mode,
            editingProduct: state.editingProduct = product,
        }))
    },

}))