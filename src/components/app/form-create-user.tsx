import React from "react";
import { Form } from "../ui/form";
import { FormController } from "./form-controller";

interface FormCreateProps {
  form: any;
  isUpdate?: boolean;
}

const FormCreateUserMemo = ({ form, isUpdate = false }: FormCreateProps) => {
  return (
    <Form {...form}>
      <FormController
        type="text"
        name={"name"}
        label={"Name"}
        placeholder={"Insert name"}
        rules={{ required: "This field is required" }}
      />
      <FormController
        type="email"
        name={"email"}
        label={"Email"}
        placeholder={"Insert email"}
        rules={{
          required: "This field is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        }}
      />
      <FormController
        type="password"
        name={"password"}
        label={"Password"}
        placeholder={"Insert password"}
        rules={{
          required: { message: "This field is required", value: !isUpdate },
        }}
        isDisable={isUpdate}
      />
      <FormController
        type="password"
        name={"passwordConfirm"}
        label={"Confirm Password"}
        placeholder={"Insert confirm password"}
        rules={{
          required: { message: "This field is required", value: !isUpdate },
        }}
        isDisable={isUpdate}
      />
    </Form>
  );
};

export const FormCreateUser = React.memo(FormCreateUserMemo);
