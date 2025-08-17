"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full"
      >
        <Card className="shadow-lg rounded-2xl p-6 text-center bg-white">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your order has been confirmed and is
            now being processed. A confirmation email with details has been sent
            to your inbox.
          </p>

          <CardContent className="bg-gray-50 rounded-xl p-4 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              What happens next?
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
              <li>You’ll receive an email receipt shortly.</li>
              <li>Digital items will be delivered instantly.</li>
              <li>Physical items (if any) will be shipped within 3–5 days.</li>
              <li>Need help? Contact our support anytime.</li>
            </ul>
          </CardContent>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop">
              <Button className="w-full sm:w-auto">Continue Shopping</Button>
            </Link>
            {/* <Link href="/orders">
              <Button variant="outline" className="w-full sm:w-auto">
                View My Orders
              </Button>
            </Link> */}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
