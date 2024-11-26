import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
  imageSrc: string;
  productName: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  productName,
  price,
}) => {
  return (
    <Card className="w-full max-w-xs rounded-xl border">
      <div className="grid gap-4 p-4">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={`${productName} image`}
            width="400"
            height="500"
            className="aspect-[4/5] w-full border object-cover"
          />
        </div>
        <div className="grid gap-1.5">
          <h3 className="text-sm font-semibold md:text-base">{productName}</h3>
          <p className="text-sm font-semibold md:text-base">{price}</p>
          {/* <p className="text-sm text-muted md:text-base">{description}</p> */}
        </div>
        <Button size="sm">Thêm vào giỏ hàng</Button>
      </div>
    </Card>
  );
};

export default ProductCard;
