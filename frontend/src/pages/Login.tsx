import { LoginForm } from "@/components/Loginform";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-[32vw] border-2 border-zinc-800 p-10 rounded-2xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
