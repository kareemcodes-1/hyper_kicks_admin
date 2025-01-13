import { ChangeEvent, useEffect, useState } from "react";
import { PhotoIcon} from '@heroicons/react/24/solid'
import toast from "react-hot-toast";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "../components/ui/dialog";
import { useStore } from "../store/store";
import { Collection } from "../types/type";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const CollectionModal = ({setOpenDialog}: {setOpenDialog: () => void;}) => {
   
     const {editingMode, editingCollection, editCollection, adminInfo, collections, setCollections} = useStore();
     const [name, setName] = useState<string>(editingCollection?.name || '');
     const [description, setDescription] = useState<string>(editingCollection?.description || '');

    useEffect(() => {
      if (editingMode && editingCollection) {
        setName(editingCollection.name || "");
        setDescription(editingCollection.description || "");
        setPreviewImage(editingCollection.image || "");
      } else {
        setName("");
        setDescription("");
        setPreviewImage("");
      }
    }, [editingMode, editingCollection])

    const [previewImage, setPreviewImage] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      if(file){
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", 'hyperkicks');
          data.append('cloud_name', 'datpkisht');

          const res = await fetch('https://api.cloudinary.com/v1_1/datpkisht/image/upload', {
            method: "POST",
            body: data,
          });

          const imageURL = await res.json();
          if (imageURL.url) {
            setPreviewImage(imageURL.url);
            toast.success("Image uploaded successfully!");
          } else {
            throw new Error("Failed to upload image");
          }
      }
    }

   const formAction = async (formData: any) => {
        setIsLoading(true);
        if(adminInfo){
          const collection = {
            userId: adminInfo._id,
             name: editingMode ? name : formData.get('name'),
             description: editingMode ? description : formData.get('description'),
             image: previewImage,
           }


            
        try {
          if(editingMode){
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections/edit/${editingCollection?._id}`, {
              method : "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(collection),
            });

            const data: Collection = await res.json();
    
            if(res.ok){
                setCollections(collections.map((collection) => {
                if(data._id === collection._id){
                    return {
                      ...data,
                    }
                }else{
                  return collection;
                }
                 }));
                 toast.success('Updated collection');
                 setOpenDialog();
                 setPreviewImage('');
                 setName('');
                 setDescription('');

            }else{
              toast.error('Something went wrong')
            }

            editCollection(null, false);

          }else{
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections/create`, {
            method : "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(collection),
          });

          const data: Collection = await res.json();
  
          if(res.ok){
               setCollections([...collections, data]);
               toast.success('Created collection');
               setOpenDialog();
               setPreviewImage('');
          }else{
            toast.error('Something went wrong');
          }
          }
        } catch (error) {
            console.log(error);
        }finally{
           setIsLoading(false);
        }
        }
  }

  return (
    <DialogContent>
    <DialogHeader>
      <DialogTitle>{editingMode ? 'Edit': 'Create'} Collection</DialogTitle>
  <form action={formAction}  className="space-y-6">
  <div>
    <Label htmlFor="name">Name</Label>
    <div className="mt-2">
      <Input       
         id="name"
        name="name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}/>
    </div>
  </div>

  <div>
    <div className="flex items-center justify-between">
      <Label htmlFor="description">Description</Label>
    </div>
    <div className="mt-2">
      <Input       
         id="description"
        name="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
    </div>
  </div>

  <div className="col-span-full">
    <label htmlFor="cover-photo" className="block text-sm/6 font-medium dark:text-gray-300 text-gray-900">
      Cover photo
    </label>
    
    {previewImage ? (
      <img src={previewImage} alt="preview-img" className="h-[15rem] w-full rounded-lg border object-cover border-dashed" />
    ) : (
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
        <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
        <div className="mt-4 flex text-sm/6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md dark:bg-transparent bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input id="file-upload" name="file-upload" type="file" onChange={handleImageUpload} className="sr-only" />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
    )}
  </div>

  <div>
    <button
      type="submit"
      className="yena-btn w-full dark:yena-btn-black"
    >
      {editingMode ? (isLoading ? 'Saving...' : 'Update') : (isLoading ? 'Saving...' : 'Create')}
    </button>
  </div>
</form>
    </DialogHeader>
  </DialogContent>
  )
}

export default CollectionModal;