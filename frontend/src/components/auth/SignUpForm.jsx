import React, { useState } from "react";
import SignupInput from "./SignupInput";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation(formFields);
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <SignupInput
        type="text"
        placeholder="Name"
        value={formFields.name}
        onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
        required={true}
      />
      <SignupInput
        type="text"
        placeholder="Username"
        value={formFields.username}
        onChange={(e) =>
          setFormFields({ ...formFields, username: e.target.value })
        }
        required={true}
      />
      <SignupInput
        type="text"
        placeholder="Email address"
        value={formFields.email}
        onChange={(e) =>
          setFormFields({ ...formFields, email: e.target.value })
        }
        required={true}
      />
      <SignupInput
        type="password"
        placeholder="Password"
        value={formFields.password}
        onChange={(e) =>
          setFormFields({ ...formFields, password: e.target.value })
        }
        required={true}
      />
      <button
        type="submit"
        diisabled={isLoading}
        className="btn btn-primary w-full text-white"
      >
        {isLoading ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          "Agree & Join"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
