import Info from "./components/Info";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";
export default function path() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user]);
  if (loading) {
    return (
      <div className="flex items-center bg-[#004643] justify-center h-screen">
        <div className="text-xl font-semibold animate-pulse text-gray-500">
          Ачаалж байна...
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[100vh] w-[100%] bg-[#004643] flex flex-col items-center gap-[8px]">
      <Info />
    </div>
  );
}
