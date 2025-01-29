import Layout from "../layout";
import {
  Dialog,
  DialogTrigger,
} from "../components/ui/dialog";
import AllProducts from "./components/AllProducts";
import { useStore } from "../store/store";
import ProductModal from "../modals/product-modal";

const Products = () => {

  const {openProductDialog, setOpenProductDialog, editProduct} = useStore();

  return (
    <Layout>
        <div className="flex items-center justify-between my-[1rem]">
          <h1 className="lg:text-[2rem] text-[1.8rem] font-semibold">Products</h1>
          <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
            <DialogTrigger className="yena-btn-black dark:yena-btn" onClick={() => {setOpenProductDialog(true); editProduct(null, false)}}>
               Create New
          </DialogTrigger>
              <ProductModal setOpenDialog={() => setOpenProductDialog(false)}/>
          </Dialog>
        </div>

        <AllProducts />
    </Layout>
  );
};

export default Products;
