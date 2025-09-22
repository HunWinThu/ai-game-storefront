import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-accent/10 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Premium
              <span className="text-primary block">Myanmar Foods</span>
              for Export
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Discover authentic Myanmar flavors with our premium selection of traditional foods, 
              spices, and snacks - ready for worldwide export.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Shop Now 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Catalog
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Product Image</span>
                  </div>
                  <h3 className="font-semibold text-sm">Traditional Snacks</h3>
                </div>
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Product Image</span>
                  </div>
                  <h3 className="font-semibold text-sm">Exotic Spices</h3>
                </div>
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Product Image</span>
                  </div>
                  <h3 className="font-semibold text-sm">Dried Fruits</h3>
                </div>
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Product Image</span>
                  </div>
                  <h3 className="font-semibold text-sm">Gift Sets</h3>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
              Export Quality
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              Worldwide Shipping
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;