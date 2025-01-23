import React from "react";
import { Form } from "../ui/form";
import { FormController } from "./form-controller";

interface FormCreateProductProps {
  form: any;
}

const FormCreateProductMemo = ({ form }: FormCreateProductProps) => {
  return (
    <Form {...form}>
      <FormController
        type="text"
        name={"name"}
        label={"Name"}
        placeholder={"Insert product name"}
        rules={{
          required: "Name is required",
          maxLength: { message: "Max 10 character", value: 10 },
        }}
      />
      <FormController
        type="text"
        name={"description"}
        label={"Description"}
        placeholder={"Insert description"}
        rules={{ required: "Description is required" }}
      />
      <FormController
        type="number"
        name={"price"}
        label={"Price"}
        placeholder={"Insert price"}
        rules={{ required: "Price is required" }}
      />
      <FormController
        type="number"
        name={"stock"}
        label={"Stock"}
        placeholder={"Insert stock"}
        rules={{ required: "Stock is required" }}
      />
    </Form>
  );
};

export const FormCreateProduct = React.memo(FormCreateProductMemo);
