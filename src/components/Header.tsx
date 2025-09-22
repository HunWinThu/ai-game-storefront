import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
        Free worldwide shipping on orders over ฿3,500 • Premium Myanmar foods for export
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-bold text-xl">
              TTL
            </div>
            <div>
              <h1 className="font-bold text-xl text-foreground">Tan Tan Lay</h1>
              <p className="text-xs text-muted-foreground">Myanmar Foods</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search Myanmar foods..." 
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 mt-4 pt-4 border-t border-border">
          <a href="#" className="text-foreground hover:text-primary font-medium">Home</a>
          <a href="#" className="text-muted-foreground hover:text-primary">All Products</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Snacks</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Spices</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Dried Fruits</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Gift Sets</a>
          <a href="#" className="text-muted-foreground hover:text-primary">About</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;