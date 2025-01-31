import { ChangeEvent, useEffect, useState } from "react";
import { PhotoIcon} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useStore } from "../store/store";
import { Collection, Product } from "../types/type";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Loading from "../components/loading";


const ProductModal = ({ setOpenDialog }: { setOpenDialog: () => void }) => {
  const { editingMode, editingProduct, editProduct, adminInfo, setProducts, products } = useStore();
  const [name, setName] = useState<string>(editingProduct?.name || "");
  const [description, setDescription] = useState<string>(
    editingProduct?.description || ""
  );
  const [price, setPrice] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [collectionId, setCollectionId] = useState<string>("");
  const [inStock, setInStock] = useState<boolean>(true);

  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (editingMode && editingProduct) {
      setCollectionId(editingProduct.collectionId);
      setName(editingProduct.name || "");
      setDescription(editingProduct.description || "");
      setPrice(String(editingProduct.price));
      setPreviewImage(editingProduct.images[0] || "");
      setInStock(editingProduct.inStock);
      setSize(editingProduct.sizes.join(','));
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCollectionId("");
      setPreviewImage("");
      setInStock(true);
    }
  }, [editingMode, editingProduct]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections`)
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, [collections]);

  const [previewImage, setPreviewImage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "hyperkicks");
      data.append("cloud_name", "datpkisht");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/datpkisht/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const imageURL = await res.json();
      if (imageURL.url) {
        setPreviewImage(imageURL.url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Failed to upload image");
      }
    }
  };

  const formAction = async (formData: FormData) => {
    setIsLoading(true);
    if (adminInfo) {
      const productName = editingMode ? name : formData.get("name");
      const productDescription = editingMode ? description : formData.get("description");
      const productPrice = editingMode ? price : formData.get("price");

      const product = {
        collectionId,
        userId: adminInfo._id,
        name: productName,
        description: productDescription,
        price: productPrice,
        sizes: size.split(","),
        images: previewImage,
        inStock,
      };

      if(!productName || !productPrice){
          if(!productName){
            toast.error('Product name is required');
          }
          if(!productPrice){
            toast.error('Product price is required');
          }
      }



      try {
        if (editingMode) {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/edit/${editingProduct?._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });

          const data: Product = await res.json();

          if (res.ok) {
            setProducts(products.map((product) => {
                if(data._id === product._id){
                    return {
                      ...data,
                    }
                }else{
                  return product;
                }
            }));
            toast.success("Updated Product");
            setOpenDialog();
            setPreviewImage("");
            setName("");
            setDescription("");
            setPrice("");
          } else {
            toast.error("Something went wrong");
          }

          editProduct(null, false);
        } else {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });

          const data: Product = await res.json();

          if (res.ok) {
            setProducts([...products, data]);
            toast.success("Created Product");
            setOpenDialog();
            setPreviewImage("");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-[2rem] flex text-start">{editingMode ? "Edit" : "Create"} Product</DialogTitle>
        <form action={formAction} className="space-y-6">
          <div className="flex items-center w-full gap-[.5rem]">
            <div className="w-full">
              <Label htmlFor="name" className="flex text-start">Name</Label>
              <div className="mt-2">
                <Input onChange={(e) => setName(e.target.value)}  name="name"
                  type="text"
                  value={name} id="name" placeholder="Name"/>
              </div>
            </div>

            <div className="w-full">
              <Label htmlFor="price" className="flex text-start">Price</Label>
              <div className="mt-2">
                <Input onChange={(e) => setPrice(e.target.value)}  name="price"
                  type="number"
                  value={price} id="price" placeholder="$0.00"/>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
            <Label htmlFor="description">Description</Label>
            </div>
            <div className="mt-2">
              <Input 
                id="description"
                type="text"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            </div>
          </div>

          <div className="flex items-center w-full gap-[.5rem]">
            <div className="w-full">
              <div className="flex items-center justify-between">
              <Label htmlFor="size">Sizes</Label>
              </div>
              <div className="mt-2">
                <Input 
                  name="size"
                  id="size"
                  type="text"
                  value={size}
                  placeholder="Enter a size (e.g., S, M, L)"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSize(e.target.value)
                  }/>
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
              <Label htmlFor="collection">Collection</Label>
              </div>

              <div className="mt-2">
              <Select onValueChange={(value) => setCollectionId(value)} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={collections?.[0]?.name} />
              </SelectTrigger>
              <SelectContent>
              {collections.map((collection) => (
                    <SelectItem value={collection._id}>{collection.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-[.3rem]">
            <Switch checked={inStock} onClick={() => setInStock(!inStock)} />
            <p>In Stock </p>
          </div>

          <div className="col-span-full">
            <Label className="flex text-start"
              htmlFor="cover-photo"
            >
              Cover photo
            </Label>

            {previewImage ? (
              <img
                src={previewImage}
                alt="preview-img"
                className="h-[10rem] w-full rounded-lg border object-cover border-dashed"
              />
            ) : (
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md dark:bg-transparent bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="yena-btn-black dark:yena-btn w-full"
            >
              {editingMode
                ? isLoading
                  ? <Loading />
                  : "Update"
                : isLoading
                ? <Loading />
                : "Create"}
            </button>
          </div>
        </form>
      </DialogHeader>
    </DialogContent>

    //     <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>{editingMode ? 'Edit': 'Create'} Product</DialogTitle>
    //   <form action={formAction}  className="space-y-6">
    //   <div>
    //     <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
    //        Name
    //     </label>
    //     <div className="mt-2">
    //       <input
    //         id="name"
    //         name="name"
    //         value={name}
    //         type="text"
    //         required
    //         autoComplete="name"
    //         onChange={(e) => setName(e.target.value)}
    //         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <div className="flex items-center justify-between">
    //       <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
    //         Description
    //       </label>
    //     </div>
    //     <div className="mt-2">
    //       <input
    //         id="description"
    //         name="description"
    //         type="text"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         required
    //         autoComplete="description"
    //         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //       />
    //     </div>
    //   </div>

    //   <div className="col-span-full">
    //     <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
    //       Cover photo
    //     </label>

    //     {previewImage ? (
    //       <img src={previewImage} alt="preview-img" className="h-[15rem] w-full rounded-lg border object-cover border-dashed" />
    //     ) : (
    //       <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
    //       <div className="text-center">
    //         <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
    //         <div className="mt-4 flex text-sm/6 text-gray-600">
    //           <label
    //             htmlFor="file-upload"
    //             className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
    //           >
    //             <span>Upload a file</span>
    //             <input id="file-upload" name="file-upload" type="file" onChange={handleImageUpload} className="sr-only" />
    //           </label>
    //           <p className="pl-1">or drag and drop</p>
    //         </div>
    //         <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
    //       </div>
    //     </div>
    //     )}
    //   </div>

    //   <div>
    //     <button
    //       type="submit"
    //       className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //     >
    //       {editingMode ? (isLoading ? 'Saving...' : 'Update') : (isLoading ? 'Saving...' : 'Create')}
    //     </button>
    //   </div>
    // </form>
    //     </DialogHeader>
    //   </DialogContent>
  );
};

export default ProductModal;
