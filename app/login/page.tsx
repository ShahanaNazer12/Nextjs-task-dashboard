"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    
    localStorage.setItem("user", username);

    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 space-y-4 p-6 border rounded-xl shadow">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}