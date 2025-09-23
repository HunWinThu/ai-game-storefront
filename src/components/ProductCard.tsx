import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Plus, Minus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image?: string;
  isPopular?: boolean;
  inStock?: boolean;
  currentQuantity?: number;
  onAddToCart?: (product: { id: string; name: string; price: number; image?: string }) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  category, 
  image, 
  isPopular = false,
  inStock = true,
  currentQuantity = 0,
  onAddToCart,
  onUpdateQuantity
}: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {isPopular && (
        <Badge className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground">
          Popular
        </Badge>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <CardContent className="p-0">
        <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-muted-foreground text-sm">Product Image</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 flex flex-col items-start space-y-3">
        <div className="w-full">
          <Badge variant="secondary" className="text-xs mb-2">
            {category}
          </Badge>
          <h3 className="font-semibold text-sm leading-tight mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-foreground">
              ฿{price}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ฿{originalPrice}
              </span>
            )}
          </div>
        </div>

        {currentQuantity > 0 ? (
          <div className="w-full flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9"
              onClick={() => onUpdateQuantity?.(id, currentQuantity - 1)}
              disabled={!inStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="flex-1 text-center py-2 bg-muted rounded-md font-medium">
              {currentQuantity}
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9"
              onClick={() => onUpdateQuantity?.(id, currentQuantity + 1)}
              disabled={!inStock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full group/btn" 
            disabled={!inStock}
            variant={inStock ? "default" : "secondary"}
            onClick={() => inStock && onAddToCart?.({ id, name, price, image })}
          >
            {inStock ? (
              <>
                <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                Add to Cart
              </>
            ) : (
              "Out of Stock"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;