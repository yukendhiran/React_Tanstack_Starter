import { SubmitHandler } from "react-hook-form";

export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
};

export type RegisterFormProps = {
  onFormSubmit: SubmitHandler<RegisterInputs>;
};

export type LoginInputs = {
  username: string;
  otp: string;
};

export type LoginFormProps = {
  onFormSubmit: SubmitHandler<LoginInputs>;
  isLoggingIn: boolean;
};
