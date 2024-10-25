import { useState } from "react";
import Input from "./Input";
import { useLoginUser } from "../../hooks/useGetQueryActions";
import { Loader } from "lucide-react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { loginUserMutation, isPending } = useLoginUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserMutation(loginData);
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
      <Input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        required={true}
      />

      <button type="submit" className="btn btn-primary w-full">
        {isPending ? <Loader className="size-5 animate-spin" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
