
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function ApplyTaskButton({ taskId }) {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    if (!user) {
      setMessage("Please login first to apply.");
      return;
    }

    if (user.role !== "freelancer") {
      setMessage("Only freelancers can apply for tasks.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        `http://localhost:8000/task/${taskId}/apply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Application failed");
      }

      setSuccess(true);
      setMessage(data.message);

    } catch (error) {
      setSuccess(false);
      setMessage(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-1/2">

      <Button
        onClick={handleApply}
        isDisabled={loading || success}
        className="w-full bg-blue-600 py-5 font-semibold text-white shadow-sm hover:bg-blue-700"
      >
        {loading
          ? "Applying..."
          : success
            ? "Applied Successfully"
            : "Apply for this Task"}
      </Button>

      {message && (
        <p
          className={`mt-2 text-center text-xs font-medium ${
            success ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

    </div>
  );
}
