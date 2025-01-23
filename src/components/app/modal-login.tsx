import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import Modal from "./modal-base";
import { FormController } from "./form-controller";
import { useAuth } from "@/hooks/auth";
import { DialogClose } from "../ui/dialog";

const ModalLoginMemo = () => {
  const form = useForm();
  const { getProfile } = useAuth();
  const { login } = useAuth();

  const {
    formState: { isValid },
  } = form;
  return (
    <Modal open={!getProfile()}>
      <Modal.Trigger>
        <Button variant="default">Login</Button>
      </Modal.Trigger>
      <Modal.Body title="Login User">
        <Form {...form}>
          <FormController
            type="email"
            name={"email"}
            label={"Email"}
            placeholder={"default: admin@admin.com"}
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            }}
          />
          <FormController
            type="password"
            name={"password"}
            label={"Password"}
            placeholder={"default: admin123"}
            rules={{ required: "Password is required" }}
          />
        </Form>
        <Modal.Footer>
          <div className="w-full flex justify-end gap-2">
            <DialogClose>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>

            <Button
              className="ml-3"
              disabled={!isValid}
              type="submit"
              variant="default"
              onClick={() => form.handleSubmit((data) => login(data as any))()}
            >
              Login
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export const ModalLogin = React.memo(ModalLoginMemo);
