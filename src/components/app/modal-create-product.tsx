import React from "react";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import Modal from "./modal-base";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "@/apollo/queries";
import { useToast } from "@/hooks/use-toast";
import { FormCreateProduct } from "./form-create-product";
import { DialogClose } from "../ui/dialog";

interface ModalCreateProductProps {
  refetch: () => void
}

const ModalCreateProductMemo = ({ refetch }: ModalCreateProductProps) => {
  const form = useForm();
  const { toast } = useToast();
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const onSubmit = async (data: any) => {
    try {
      await createProduct({
        variables: { input: data },
      });
      toast({ title: "Product added successfully!", variant: "default" });
      refetch();
    } catch (err) {
      console.error("Error adding product:", err);
      toast({ title: "Failed to add product!", variant: "destructive" });
    }
  };

  return (
    <Modal>
      <Modal.Trigger>
        <Button variant="default">
          <CirclePlus />
          Create New Product
        </Button>
      </Modal.Trigger>
      <Modal.Body title="Create New Product">
        <FormCreateProduct form={form} />
        <Modal.Footer>
          <div className="w-full flex justify-end gap-2">
            <DialogClose>
              <Button className="mr-2" type="button" variant="secondary">
                Close
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={() => form.handleSubmit((data) => onSubmit(data))()}
              >
                Save
              </Button>
            </DialogClose>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export const ModalCreateProduct = React.memo(ModalCreateProductMemo);
