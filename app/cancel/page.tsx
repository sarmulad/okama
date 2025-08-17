export default function CartPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-red-600">Checkout Cancelled</h1>
      <p className="mt-4 text-lg">
        Your payment was not completed. Please try again.
      </p>
    </div>
  );
}
