import { createClient } from '@supabase/supabase-js';

// With Lovable's Supabase integration, the client is automatically configured
export const supabase = createClient(
  'https://placeholder.supabase.co', // This will be automatically replaced by Lovable
  'placeholder-key' // This will be automatically replaced by Lovable
);

// Database schema SQL for products table
export const createProductsTableSQL = `
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
`;