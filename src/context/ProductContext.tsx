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

// Try these sources in order: local /products.json → GitHub raw fallback
const GITHUB_PRODUCTS_URL = 'https://raw.githubusercontent.com/jiqq-doy/toko-sr12/main/public/products.json';
const FIREBASE_STATUS_KEY = 'sr12_firebase_db_url'; // admin saves this via localStorage (different origin, can't share — use hardcoded fallback)

// ⚠️ Paste your Firebase Realtime Database URL here (from Admin Dashboard → Pengaturan → Firebase URL)
// Example: 'https://sr12-xxxxxx-default-rtdb.firebaseio.com'
const FIREBASE_DB_URL = ''; // Will be overridden by /products.json soldOutIds if available

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories] = useState<string[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  const applyStatus = (baseProds: Product[], soldOutIds: string[]): Product[] =>
    baseProds.map(p => ({ ...p, soldOut: soldOutIds.includes(p.id), status: soldOutIds.includes(p.id) ? 'soldout' : 'ready' }));

  const fetchStatus = async () => {
    // 1. Try Firebase Realtime Database (fastest real-time, set by admin)
    if (FIREBASE_DB_URL) {
      try {
        const fbRes = await fetch(FIREBASE_DB_URL.replace(/\/$/, '') + '/products-status.json?t=' + Date.now());
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          if (fbData && Array.isArray(fbData.soldOutIds)) {
            setProducts(applyStatus(initialProducts, fbData.soldOutIds));
            return;
          }
        }
      } catch { /* continue to fallback */ }
    }

    // 2. Try /products.json served by Vercel (updated on every push)
    try {
      const res = await fetch('/products.json?t=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (data?.products && Array.isArray(data.products)) {
          setProducts(data.products.map((p: Product) => ({
            ...initialProducts.find(ip => ip.id === p.id) || p,
            soldOut: p.soldOut || p.status === 'soldout',
            status: p.status,
          })));
          return;
        }
        // Also handle products-status format
        if (data?.soldOutIds) {
          setProducts(applyStatus(initialProducts, data.soldOutIds));
          return;
        }
      }
    } catch { /* continue */ }

    // 3. GitHub raw fallback
    try {
      const ghRes = await fetch(GITHUB_PRODUCTS_URL + '?t=' + Date.now());
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        if (ghData?.soldOutIds) {
          setProducts(applyStatus(initialProducts, ghData.soldOutIds));
        }
      }
    } catch { /* use initialProducts as-is */ }
  };

  useEffect(() => {
    fetchStatus();
    const timer = setInterval(fetchStatus, 20000); // refresh every 20s
    return () => clearInterval(timer);
  }, []);

  const getProduct = (id?: string) => {
    if (!id) return undefined;
    return products.find(p => p.id === id);
  };

  const refreshProducts = async () => {
    setIsLoading(true);
    await fetchStatus();
    setIsLoading(false);
  };

  return (
    <ProductContext.Provider value={{ products, categories, getProduct, refreshProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

