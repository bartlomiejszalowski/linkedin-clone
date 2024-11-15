import { useState } from "react";
import { useSignUp } from "../../hooks/useGetQueryActions";
import { Loader } from "lucide-react";
import Input from "./Input";
import { useSignUpFormValidation } from "../../hooks/useValidation";

const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { signUpMutation, isPending } = useSignUp();
  const { formErrors, validateForm } = useSignUpFormValidation();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const isFormValid = await validateForm(formFields);

    if (isFormValid) {
      signUpMutation(formFields);
    }

    return;
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
      {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}

      <Input
        type="text"
        placeholder="Username"
        value={formFields.username}
        onChange={(e) =>
          setFormFields({ ...formFields, username: e.target.value })
        }
        required={true}
      />
      {formErrors.username && (
        <p className="text-red-500">{formErrors.username}</p>
      )}

      <Input
        type="text"
        placeholder="Email address"
        value={formFields.email}
        onChange={(e) =>
          setFormFields({ ...formFields, email: e.target.value })
        }
        required={true}
      />
      {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

      <Input
        type="password"
        placeholder="Password"
        value={formFields.password}
        onChange={(e) =>
          setFormFields({ ...formFields, password: e.target.value })
        }
        required={true}
      />
      {formErrors.password && (
        <p className="text-red-500">{formErrors.password}</p>
      )}

      <Input
        type="password"
        placeholder="Confirm Password"
        value={formFields.confirmPassword}
        onChange={(e) =>
          setFormFields({ ...formFields, confirmPassword: e.target.value })
        }
        required={true}
      />

      {formErrors.confirmPassword && (
        <p className="text-red-500">{formErrors.confirmPassword}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
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
