"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc: number, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="text-black">
        <h1> Your Cart is Empty.</h1>
      </div>
    );
  }

  return (
    <div className="text-black container mx-auto px-4 py-8 border-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center"> Checkout </h1>
      <Card className="max-w-md mx-auto mb-8 border-gray-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, key) => (
              <li
                key={key}
                className="flex flex-col gap-2 border-gray-300 border-b pb-2"
              >
                <div className="flex justify-between ">
                  <span className="font-medium">{item.name} </span>
                  <span className="font-semibold ">
                    €{((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-300 cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">
                    {" "}
                    {item.quantity}{" "}
                  </span>
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800 cursor-pointer"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4 border-t border-gray-300 pt-2 text-lg font-semibold">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold">€{total / 100}</span>
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)}></input>
        <Button
          type="submit"
          variant={"default"}
          className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
        >
          {" "}
          Proceed to Payment
        </Button>

        {/* <Button
        <Button
          onClick={() => {
            clearCart();
          }}
          variant={"default"}
          className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
        >
          {" "}
          Clear Cart
        </Button> */}
      </form>
    </div>
  );
}
