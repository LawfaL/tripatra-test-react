import React from "react";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import Modal from "./modal-base";
import { FormCreateUser } from "./form-create-user";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/apollo/queries";
import { DialogClose } from "@radix-ui/react-dialog";

interface ModalCreateUserProps {
  refetch: () => void
}

const ModalCreateUserMemo = ({ refetch }: ModalCreateUserProps) => {
  const form = useForm();

  const { toast } = useToast();
  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = async (data: any) => {
    try {
      await createUser({
        variables: { input: data },
      });
      toast({ title: "User added successfully!", variant: "default" });
      refetch();
    } catch (err) {
      console.error("Error adding user:", err);
      toast({ title: "Failed to add user!", variant: "destructive" });
    }
  };
  return (
    <Modal>
      <Modal.Trigger>
        <Button variant="default">
          <CirclePlus />
          Create New User
        </Button>
      </Modal.Trigger>
      <Modal.Body title="Create New User">
        <FormCreateUser form={form} />
        <Modal.Footer>
          <div className="w-full flex justify-end gap-2">
            <DialogClose>
              <Button type="button" variant="secondary">
                Close
              </Button>
              <Button
                className="ml-2"
                type="button"
                variant="default"
                disabled={!form.formState.isValid}
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

export const ModalCreateUser = React.memo(ModalCreateUserMemo);
