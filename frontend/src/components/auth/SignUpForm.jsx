import React, { useState } from "react";
import Input from "./Input";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useSignUp } from "../../hooks/useGetQueryActions";

const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const { signUpMutation, isPending } = useSignUp();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation(formFields);
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Name"
        value={formFields.name}
        onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
        required={true}
      />
      <Input
        type="text"
        placeholder="Username"
        value={formFields.username}
        onChange={(e) =>
          setFormFields({ ...formFields, username: e.target.value })
        }
        required={true}
      />
      <Input
        type="text"
        placeholder="Email address"
        value={formFields.email}
        onChange={(e) =>
          setFormFields({ ...formFields, email: e.target.value })
        }
        required={true}
      />
      <Input
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
        diisabled={isPending}
        className="btn btn-primary w-full text-white"
      >
        {isPending ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          "Agree & Join"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
