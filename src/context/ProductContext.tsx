import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, CATEGORIES as initialCategories, type Product } from '../data/products';

interface ProductContextType {
  products: Product[];
  categories: string[];
  getProduct: (id?: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType>({
  products: initialProducts,
  categories: initialCategories,
  getProduct: () => undefined,
  refreshProducts: async () => {},
  isLoading: false,
});

const REMOTE_STATUS_URL = 'https://raw.githubusercontent.com/jiqq-doy/toko-sr12/main/public/products.json';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLiveProducts = async () => {
    try {
      // 1. Try local /products.json first (fastest on Vercel)
      let res: Response | null = null;
      try {
        res = await fetch('/products.json?t=' + Date.now());
      } catch {
        res = null;
      }

      // 2. If not ok, fetch directly from GitHub raw (real-time before Vercel deploy finishes)
      if (!res || !res.ok) {
        res = await fetch(REMOTE_STATUS_URL + '?t=' + Date.now());
      }

      if (res && res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
          if (Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories);
          }
        }
      }
    } catch {
      // Fallback silently to initialProducts
    }
  };

  useEffect(() => {
    fetchLiveProducts();

    // Auto-refresh every 20s for live synchronization
    const timer = setInterval(fetchLiveProducts, 20000);
    return () => clearInterval(timer);
  }, []);

  const getProduct = (id?: string) => {
    if (!id) return undefined;
    return products.find(p => p.id === id);
  };

  const refreshProducts = async () => {
    setIsLoading(true);
    await fetchLiveProducts();
    setIsLoading(false);
  };

  return (
    <ProductContext.Provider value={{ products, categories, getProduct, refreshProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
