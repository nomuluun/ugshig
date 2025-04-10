import { useRouter } from "next/router";
import Dashboard from "./components/Dashboard";
import { useUser } from "./context/UserContext";
import { useEffect, useState } from "react";

export default function Home() {
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
      <div className="flex items-center bg-teal-900 justify-center h-screen">
        <div className="text-xl font-semibold animate-pulse text-gray-500">
          Ачаалж байна...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}
