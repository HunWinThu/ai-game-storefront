import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, updateQuantity, cartItems } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        // Fall back to sample products if database is not set up
        setProducts(sampleProducts);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      // Fall back to sample products
      setProducts(sampleProducts);
    } finally {
      setIsLoading(false);
    }
  };

  // Sample data as fallback
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Traditional Myanmar Tea Leaf Salad Mix",
      price: 899,
      original_price: 1079,
      category: "Traditional Mix",
      is_popular: true,
      in_stock: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Premium Thanaka Powder",
      price: 679,
      category: "Beauty & Wellness",
      is_popular: true,
      in_stock: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      name: "Myanmar Fish Sauce (Premium)",
      price: 459,
      category: "Sauces & Condiments",
      in_stock: true,
      is_popular: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "4",
      name: "Dried Mango Strips",
      price: 569,
      original_price: 679,
      category: "Dried Fruits",
      in_stock: true,
      is_popular: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "5",
      name: "Myanmar Curry Spice Set",
      price: 1179,
      category: "Spice Sets",
      is_popular: true,
      in_stock: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "6",
      name: "Traditional Palm Sugar Blocks",
      price: 359,
      category: "Sweeteners",
      in_stock: false,
      is_popular: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "7",
      name: "Myanmar Rice Crackers",
      price: 319,
      category: "Snacks",
      in_stock: true,
      is_popular: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "8",
      name: "Fermented Shrimp Paste",
      price: 539,
      category: "Sauces & Condiments",
      in_stock: true,
      is_popular: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Popular Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Popular Myanmar Foods
              </h2>
              <p className="text-muted-foreground">
                Most loved traditional foods for export
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                  <div className="bg-muted h-48 rounded mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-3 rounded mb-2 w-2/3"></div>
                  <div className="bg-muted h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.filter(p => p.is_popular).slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.original_price}
                  category={product.category}
                  image={product.image_url}
                  isPopular={product.is_popular}
                  inStock={product.in_stock}
                  currentQuantity={cartItems.find(item => item.id === product.id)?.quantity || 0}
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Spices & Seasonings", count: "25+ items" },
              { name: "Dried Fruits", count: "18+ items" },
              { name: "Traditional Snacks", count: "32+ items" },
              { name: "Sauces & Condiments", count: "15+ items" }
            ].map((category) => (
              <div 
                key={category.name}
                className="bg-card hover:bg-accent/50 rounded-lg p-6 text-center cursor-pointer transition-colors group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">🍛</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              All Products
            </h2>
            <Button variant="outline">
              View All Products
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                  <div className="bg-muted h-48 rounded mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-3 rounded mb-2 w-2/3"></div>
                  <div className="bg-muted h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.original_price}
                  category={product.category}
                  image={product.image_url}
                  isPopular={product.is_popular}
                  inStock={product.in_stock}
                  currentQuantity={cartItems.find(item => item.id === product.id)?.quantity || 0}
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;