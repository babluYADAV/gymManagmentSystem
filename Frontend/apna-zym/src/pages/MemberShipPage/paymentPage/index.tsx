import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { useState } from "react";
import axios from "axios";
import type { FormEvent } from "react";
import type { SuccessPayload } from "..";
import { useNavigate } from "react-router-dom";

interface PageProps {
  successPayload: SuccessPayload;
  price: number;
  clientSecret: string;
}

const PaymentPage = ({ successPayload, price, clientSecret }: PageProps) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement as StripeCardElement },
      });
      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:5000/api/memberShip/success",
          successPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        navigate("/paymentSuccess");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-white text-xl mb-6 text-center font-semibold">
          Payment
        </h2>

        {/* Card input wrapper */}
        <div className="mb-4 p-3 bg-gray-700 rounded border border-gray-600 focus-within:border-blue-500 transition">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#fff",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  "::placeholder": { color: "#a0aec0" },
                  iconColor: "#fff",
                },
                invalid: {
                  color: "#f56565",
                  iconColor: "#f56565",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
        >
          {loading ? "Processing..." : `Pay ₹${price}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
