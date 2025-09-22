# Database Setup Instructions

## First Time Setup

Since you've connected to Supabase, you now need to create the database tables and storage bucket for your products.

### Step 1: Create the Products Table

1. Go to your Supabase dashboard
2. Navigate to the **SQL Editor**
3. Copy and paste the following SQL code:

```sql
-- Enable RLS
alter table products enable row level security;

-- Create products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price decimal(10,2) not null,
  original_price decimal(10,2),
  category text not null,
  description text,
  image_url text,
  is_popular boolean default false,
  in_stock boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_products_updated_at
  before update on products
  for each row
  execute function update_updated_at_column();

-- RLS policies (allow all operations for now - adjust based on your auth needs)
create policy "Enable read access for all users" on products for select using (true);
create policy "Enable insert access for all users" on products for insert with check (true);
create policy "Enable update access for all users" on products for update using (true);
create policy "Enable delete access for all users" on products for delete using (true);

-- Create storage bucket for product images
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Enable read access for all users" on storage.objects for select using (bucket_id = 'product-images');
create policy "Enable insert access for all users" on storage.objects for insert with check (bucket_id = 'product-images');
create policy "Enable update access for all users" on storage.objects for update using (bucket_id = 'product-images');
create policy "Enable delete access for all users" on storage.objects for delete using (bucket_id = 'product-images');
```

4. Click **Run** to execute the SQL

### Step 2: Add Environment Variables

Make sure your `.env.local` file (create it if it doesn't exist) contains your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase dashboard under **Settings > API**.

### Step 3: Access the Admin Panel

1. Navigate to `/admin` in your application (or click the Admin link in the header)
2. Start adding your products with images, prices, and descriptions
3. The system will automatically handle image uploads to Supabase storage

## Managing Your Products

- **Add Products**: Click "Add Product" to create new items
- **Edit Products**: Click the edit icon on any product card
- **Upload Images**: Use the file input to upload product photos
- **Categories**: Organize products by categories (Spices, Snacks, etc.)
- **Popular Items**: Mark products as popular to feature them prominently
- **Inventory**: Toggle in-stock/out-of-stock status

## Features Available

✅ Product CRUD operations (Create, Read, Update, Delete)
✅ Image upload and storage
✅ Price management with original/sale pricing
✅ Category organization
✅ Popular product highlighting
✅ Stock status management
✅ Responsive admin interface
✅ Real-time updates on the homepage

Your homepage will automatically display products from the database once they're added!