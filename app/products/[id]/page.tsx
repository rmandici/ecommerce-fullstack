import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const paramsAwaited = await params;
    if (!paramsAwaited.id) {
      throw new Error("params.id is required");
    }
    const product = await stripe.products.retrieve(paramsAwaited.id!, {
      expand: ["default_price"],
    });
    if (!product) {
      throw new Error(`The product with id ${paramsAwaited.id} doesn't exist`);
    }
    const plainProduct = JSON.parse(JSON.stringify(product)); // 💡 make it serializable
    return <ProductDetail product={plainProduct} />;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return <div>Eroare: {error.message}</div>;
    } else {
      console.error("Unknown error:", error);
      return <div>Eroare: Unknown error</div>;
    }
  }
}
