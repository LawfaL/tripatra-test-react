import React from "react";
import { Button } from "../ui/button";
import Modal from "./modal-base";
import { DialogClose } from "../ui/dialog";
import { FormCreateProduct } from "./form-create-product";
import { useForm } from "react-hook-form";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "@/apollo/queries";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
  children: React.ReactNode;
  data: any;
  refetch: () => void;
}

const ProductDetailMemo = ({ children, data, refetch }: ProductDetailProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      id: data?.id,
      name: data?.name,
      description: data?.description,
      price: data?.price,
      stock: data?.stock,
    },
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const onSubmit = async (data: any) => {
    try {
      await updateProduct({
        variables: { input: data },
      });
      toast({ title: "Product updated successfully!", variant: "default" });
      refetch();
    } catch (err) {
      console.error("Error update product:", err);
      toast({ title: "Failed to update product!", variant: "destructive" });
    }
  };

  const onDelete = async () => {
    try {
      await deleteProduct({
        variables: { id: data?.id },
      });
      toast({ title: "Product deleted successfully!", variant: "default" });
      refetch();
    } catch (err) {
      console.error("Error update product:", err);
      toast({ title: "Failed to delete product!", variant: "destructive" });
    }
  };

  return (
    <Modal>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Body title={data?.name}>
        <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
          <img
            src={`https://picsum.photos/seed/${
              Math.floor(Math.random() * 100) + 1
            }/500`}
            alt="Image"
            className="object-cover transition-all hover:scale-105 rounded-md h-full "
          />
        </AspectRatio>
        <FormCreateProduct form={form} />
        <Modal.Footer>
          <div className="w-full flex justify-end">
            <DialogClose>
              <Button variant="secondary">Close</Button>
              <Button
                className="mx-2"
                variant="destructive"
                onClick={() => onDelete()}
              >
                Delete
              </Button>
              <Button
                disabled={!form.formState.isValid}
                variant="default"
                onClick={() => form.handleSubmit((data) => onSubmit(data))()}
              >
                Update
              </Button>
            </DialogClose>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export const ProductDetail = React.memo(ProductDetailMemo);
