import React from "react";
import { Button } from "../ui/button";
import Modal from "./modal-base";
import { DialogClose } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { DELETE_USER, UPDATE_USER } from "@/apollo/queries";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FormCreateUser } from "./form-create-user";

interface UserDetailProps {
  index: number;
  children: React.ReactNode;
  data: any;
  refetch: () => void;
}

const UserDetailMemo = ({
  index,
  children,
  data,
  refetch,
}: UserDetailProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      id: data?.id,
      name: data?.name,
      email: data?.email,
    },
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const onSubmit = async (data: any) => {
    try {
      await updateUser({
        variables: {
          input: { id: data.id, name: data.name, email: data.email },
        },
      });
      toast({ title: "User updated successfully!", variant: "default" });
      refetch();
    } catch (err) {
      console.error("Error update User:", err);
      toast({ title: "Failed to update User!", variant: "destructive" });
    }
  };

  const onDelete = async () => {
    try {
      await deleteUser({
        variables: { id: data?.id },
      });
      toast({ title: "User deleted successfully!", variant: "default" });
      refetch();
    } catch (err) {
      console.error("Error update User:", err);
      toast({ title: "Failed to delete User!", variant: "destructive" });
    }
  };

  return (
    <Modal>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Body title={data?.name}>
        <div className="w-full flex justify-center">
          <Avatar className="w-[150px] h-[150px] hover:scale-105">
            <AvatarImage
              src={`https://randomuser.me/api/portraits/${
                index + 1 ? "men" : "women"
              }/${index + 1}.jpg`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <FormCreateUser form={form} isUpdate/>
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

export const UserDetail = React.memo(UserDetailMemo);
