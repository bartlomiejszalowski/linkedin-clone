import { useState } from "react";
import Input from "./Input";
import { useLoginUser } from "../../hooks/useGetQueryActions";
import { Loader } from "lucide-react";
import { useSignInFormValidation } from "../../hooks/useValidation";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { loginUserMutation, isPending } = useLoginUser();
  const { formErrors, validateForm } = useSignInFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = await validateForm(loginData);

    if (isFormValid) {
      loginUserMutation(loginData);
    }

    return;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <Input
        type="text"
        placeholder="Username"
        value={loginData.username}
        onChange={(e) =>
          setLoginData({ ...loginData, username: e.target.value })
        }
        required={true}
      />
      {formErrors.username && (
        <p className="text-red-500">{formErrors.username}</p>
      )}
      <Input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        required={true}
      />

      {formErrors.password && (
        <p className="text-red-500">{formErrors.password}</p>
      )}

      <button type="submit" className="btn btn-primary w-full">
        {isPending ? <Loader className="size-5 animate-spin" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
