import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product, ProductInsert } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus, Upload } from 'lucide-react';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState<ProductInsert>({
    name: '',
    price: 0,
    original_price: undefined,
    category: '',
    description: '',
    image_url: '',
    is_popular: false,
    in_stock: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products. Make sure to run the database setup SQL.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setForm({ ...form, image_url: data.publicUrl });
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(form)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Product updated successfully" });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([form]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Product created successfully" });
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Product deleted successfully" });
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      price: 0,
      original_price: undefined,
      category: '',
      description: '',
      image_url: '',
      is_popular: false,
      in_stock: true
    });
    setEditingProduct(null);
    setIsCreating(false);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      original_price: product.original_price,
      category: product.category,
      description: product.description || '',
      image_url: product.image_url || '',
      is_popular: product.is_popular,
      in_stock: product.in_stock
    });
    setIsCreating(true);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {isCreating && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingProduct ? 'Edit Product' : 'Create New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (THB)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={form.price || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm({ ...form, price: value === '' ? 0 : parseFloat(value) || 0 });
                    }}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (THB)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={form.original_price || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm({ ...form, original_price: value === '' ? undefined : parseFloat(value) || undefined });
                    }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="image">Product Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {form.image_url && (
                    <img src={form.image_url} alt="Preview" className="h-10 w-10 object-cover rounded" />
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={form.is_popular}
                    onCheckedChange={(checked) => setForm({ ...form, is_popular: checked })}
                  />
                  <Label htmlFor="popular">Popular Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="inStock"
                    checked={form.in_stock}
                    onCheckedChange={(checked) => setForm({ ...form, in_stock: checked })}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-4"
                />
              )}
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">฿{product.price}</span>
                {product.original_price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ฿{product.original_price}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mb-4">
                {product.is_popular && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                    Popular
                  </span>
                )}
                {!product.in_stock && (
                  <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs">
                    Out of Stock
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found. Create your first product!</p>
          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-semibold mb-2">First time setup:</p>
            <p>Run this SQL in your Supabase SQL Editor to create the products table:</p>
            <pre className="mt-2 p-2 bg-background rounded text-xs overflow-x-auto">
{`-- Copy the SQL from src/lib/supabase.ts (createProductsTableSQL)`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;