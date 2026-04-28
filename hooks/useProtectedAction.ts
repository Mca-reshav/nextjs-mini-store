"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { routePath } from "@/types/route";

export const useProtectedAction = () => {
  const { token } = useAuth();
  const router = useRouter();

  const run = (callback: () => void) => {
    if (!token) {
      router.push(routePath.login);
      return;
    }

    callback();
  };

  return { run };
};