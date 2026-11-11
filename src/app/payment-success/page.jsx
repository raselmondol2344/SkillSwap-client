
import { payment } from "@/lib/payment-action";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";

// Prevent prerendering
export const instant = false;

async function SuccessContent({ searchParams }) {
  await connection();

  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  let customerEmail = "";

  try {
    // 1. Retrieve Stripe Session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const {
      status,
      payment_status,
      customer_details,
    } = session;

    // 2. Verify Payment
    if (status !== "complete" || payment_status !== "paid") {
      redirect("/");
    }

    customerEmail = customer_details?.email || "";

    // 3. Update MongoDB
    const pay_data = await payment({
      session_id,
    });

    console.log("Payment Result:", pay_data);

    if (!pay_data?.success) {
      throw new Error(
        pay_data?.message || "Database update failed"
      );
    }
  } catch (error) {
    console.error("Payment Error:", error);
    throw error;
  }

  // 4. Success UI
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-xl rounded-2xl border border-green-100 bg-white p-6 text-center shadow-xl sm:p-10">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 sm:h-24 sm:w-24">
          <svg
            className="h-10 w-10 text-green-600 sm:h-12 sm:w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
          Payment Successful!
        </h1>

        <p className="mt-3 text-2xl">🎉</p>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          Thank you for your payment! Your payment has been successfully
          completed.
        </p>

        {/* <div className="mt-7 rounded-xl border border-green-100 bg-green-50 p-4">
          <p className="text-sm font-medium text-gray-600">
            Payment Status
          </p>

          <p className="mt-2 text-lg font-bold text-green-600">
            Paid Successfully
          </p>
        </div> */}

        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Payment confirmation email
          </p>

          <p className="mt-2 break-all text-sm font-semibold text-gray-800 sm:text-base">
            {customerEmail || "Payment completed"}
          </p>
        </div>

       

        <p className="mt-6 text-xs leading-6 text-gray-500 sm:text-sm">
          If you have any questions, please contact our support team.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashbord/client/manage-proposals"
            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Manage Proposals
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Go to Home
          </Link>
        </div>

      </div>
    </section>
  );
}

export default function Success({ searchParams }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg font-semibold text-gray-600">
            Verifying your payment...
          </p>
        </div>
      }
    >
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
