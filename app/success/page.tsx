"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    if (sessionId) {
      setMessage(" Payment successful! Thank you for your order.");
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}
