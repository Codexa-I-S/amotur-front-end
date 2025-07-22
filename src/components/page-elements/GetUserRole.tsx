import { jwtDecode } from "jwt-decode"

type DecodedToken = {
  userId: string;
  email: string;
  role: "ADMIN" | "TURISTA";
  iat: number;
  exp: number;
}

export function getUserRole(): "ADMIN" | "TURISTA" | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role;
  } catch {
    console.log("Token inválido");
    return null;
  }
}