import { SignupForm } from "@/components/SignupForm";

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-[32vw] border-2 border-zinc-800 p-10 rounded-2xl">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
