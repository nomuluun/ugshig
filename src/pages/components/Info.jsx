import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import Menu from "./Menu";

export default function Info() {
  const router = useRouter();
  const { user, setUser } = useUser();
  console.log("info", user);
  function logout() {
    localStorage.removeItem("user");
    router.push("/login");
    setUser(null);
  }
  return (
    <div className="min-h-screen  bg-teal-900 flex flex-col items-center  text-white">
      <Menu />
      <h1>{user?.name}</h1>
      <button onClick={logout}>garah</button>
    </div>
  );
}
