import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductGrid = () => {
  // Sample Myanmar food products
  const products = [
    {
      id: "1",
      name: "Traditional Myanmar Tea Leaf Salad Mix",
      price: 24.99,
      originalPrice: 29.99,
      category: "Traditional Mix",
      isPopular: true,
      inStock: true
    },
    {
      id: "2", 
      name: "Premium Thanaka Powder",
      price: 18.99,
      category: "Beauty & Wellness",
      isPopular: true,
      inStock: true
    },
    {
      id: "3",
      name: "Myanmar Fish Sauce (Premium)",
      price: 12.99,
      category: "Sauces & Condiments",
      inStock: true
    },
    {
      id: "4",
      name: "Dried Mango Strips",
      price: 15.99,
      originalPrice: 18.99,
      category: "Dried Fruits",
      inStock: true
    },
    {
      id: "5",
      name: "Myanmar Curry Spice Set",
      price: 32.99,
      category: "Spice Sets",
      isPopular: true,
      inStock: true
    },
    {
      id: "6",
      name: "Traditional Palm Sugar Blocks",
      price: 9.99,
      category: "Sweeteners",
      inStock: false
    },
    {
      id: "7",
      name: "Myanmar Rice Crackers",
      price: 8.99,
      category: "Snacks",
      inStock: true
    },
    {
      id: "8",
      name: "Fermented Shrimp Paste",
      price: 14.99,
      category: "Sauces & Condiments",
      inStock: true
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;