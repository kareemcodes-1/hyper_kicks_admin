import Layout from "../layout";
import {
  Dialog,
  DialogTrigger,
} from "../components/ui/dialog";

import AllCollections from "./components/AllCollections";
import CollectionModal from "../modals/collection-modal";
import { useStore } from "../store/store";

const Collections = () => {

  const {openCollectionDialog, setOpenCollectionDialog, editCollection} = useStore();

  return (
    <Layout>
      <div>
        <div className="flex items-center justify-between my-[1rem]">
          <h1 className="lg:text-[2rem] text-[1.8rem] font-semibold">Collections</h1>
          <Dialog open={openCollectionDialog} onOpenChange={setOpenCollectionDialog}>
            <DialogTrigger className="yena-btn" onClick={() => {setOpenCollectionDialog(true); editCollection(null, false)}}>
               Create New
          </DialogTrigger>
              <CollectionModal setOpenDialog={() => setOpenCollectionDialog(false)}/>
          </Dialog>
        </div>

        <AllCollections />
      </div>
    </Layout>
  );
};

export default Collections;
