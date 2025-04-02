import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useLoginContext } from "@/providers/LoginProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
      setIsLoggedIn(false);
    }, 1500);
  };

  const handleSignup = () => {
    setSignup((prev) => !prev);
    signup ? navigate("/login") : navigate("/signup");
  };

  return (
    <nav className="flex items-center px-8 py-4 border-b-2 text-xl font-semibold absolute w-screen text-zinc-300 justify-between">
      <h1>Notion Notes</h1>
      {isLoggedIn ? (
        <Button variant="outline" size="icon" onClick={handleLogout}>
          <LogOut size={16} />
        </Button>
      ) : (
        <Button variant={"outline"} onClick={handleSignup}>
          {signup ? "Login" : "Signup"}
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
