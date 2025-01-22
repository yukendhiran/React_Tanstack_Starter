import { UseMutationResult } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { loginSchema, userFormSchema } from "./schema";

type FecthData<D> = {
  data: D[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
};

type FlattenObjectType<T, P extends string | number = ""> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? FlattenObjectType<T[K], `${P extends "" ? "" : `${P}.`}${K & string}`>
    : Record<`${P extends "" ? "" : `${P}.`}${K & string}`, T[K]>;
}[keyof T & (string | number)];

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  Mutate: UseMutationResult<T, Error, T, unknown>;
  editForm?: boolean;
};

//Enum

export const userRoleEnum = z.enum(["ADMIN", "EMPLOYEE", "MANAGER"]);
//

export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
};

export type RegisterFormProps = {
  onFormSubmit: SubmitHandler<RegisterInputs>;
};

export type LoginFormProps = {
  onFormSubmit: SubmitHandler<z.infer<typeof loginSchema>>;
  isLoggingIn: boolean;
};

export type LoginFormValues = z.infer<typeof loginSchema>;

// Full User Record (for fetching user data)
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type UserFormValues = z.infer<typeof userFormSchema>;

export type UserFormProps = FormProps<UserFormValues>;

export type UserFetch = {
  users: User;
};

export type FlattenUserFetch = FlattenObjectType<UserFetch>;
