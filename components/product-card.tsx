import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  return (
    <Link href={`/products/${product.id}`}>
      <div className="block h-full">
        <Card className="group hover:shadow-2xl transition duration-300 py-0  flex flex-col border-gray-300 gap-0">
          {product.images && product.images[0] && (
            <div className="relative h-60 w-full">
              <Image
                alt={product.name}
                src={product.images[0]}
                layout="fill"
                objectFit="cover"
                className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
              />
            </div>
          )}
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-bold text-gray-800 mx-4">
              {product.name}
            </CardTitle>
            <CardContent className="p-4 flex-grow flex flex-col justify-between">
              {product.description && (
                <p className="h-20">{product.description}</p>
              )}
              {price && price.unit_amount && (
                <p className="text-lg font-semibold text-gray-900">
                  €{(price.unit_amount / 100).toFixed(2)}
                </p>
              )}

              <Button className="mt-4 bg-black text-white cursor-pointer">
                {" "}
                View Details{" "}
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </Link>
  );
};
