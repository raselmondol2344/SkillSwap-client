
"use server";

import { db } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { ObjectId } from "mongodb";

export const payment = async ({ session_id }) => {
  try {
    // 1. Verify payment from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (
      session.status !== "complete" ||
      session.payment_status !== "paid"
    ) {
      throw new Error("Payment not successful");
    }

    // 2. Get verified metadata from Stripe
    const { taskId, freelancerId, clientId } = session.metadata;

    if (
      !taskId ||
      !freelancerId ||
      !clientId ||
      !ObjectId.isValid(taskId)
    ) {
      throw new Error("Invalid payment metadata");
    }

    // 3. Task collection
    const taskCollection = db.collection("task");

    // 4. Check duplicate payment
    const existingPayment = await taskCollection.findOne({
      _id: new ObjectId(taskId),
      stripe_session_id: session_id,
    });

    if (existingPayment) {
      return {
        success: true,
        message: "Payment already processed",
      };
    }

    // 5. Update task status
    const result = await taskCollection.updateOne(
      {
        _id: new ObjectId(taskId),
        client_id: clientId,
        status: "in-process",
        applied_freelancers: freelancerId,
        stripe_session_id: { $exists: false },
      },
      {
        $set: {
          status: "completed",
          paid_freelancer: freelancerId,
          stripe_session_id: session_id,
        },
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Task not found or payment already processed");
    }

    return {
      success: true,
      message: "Task completed successfully",
    };

  } catch (error) {
    console.log("Payment Action Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};
