
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const title = formData.get("title");
    const budget = Number(formData.get("budget"));
    const taskId = formData.get("taskId");
    const freelancerId = formData.get("freelancerId");

    if (
      !title ||
      !taskId ||
      !freelancerId ||
      !Number.isFinite(budget) ||
      budget <= 0
    ) {
      return NextResponse.json(
        { error: "Invalid payment data" },
        { status: 400 }
      );
    }

    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
            },
            unit_amount: Math.round(budget * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        clientId: user.id,
        taskId,
        freelancerId,
      },

      mode: "payment",

      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/dashbord/client/manage-proposals`,
    });

    return NextResponse.redirect(session.url, 303);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
