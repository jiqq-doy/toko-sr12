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

const GITHUB_PRODUCTS_URL = 'https://raw.githubusercontent.com/jiqq-doy/toko-sr12/main/public/products.json';

// Paste your Firebase Realtime Database URL here if using Firebase (optional)
const FIREBASE_DB_URL: string = '';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);
  const lastUpdatedRef = React.useRef<string>('');

  const applyStatus = (baseProds: Product[], soldOutIds: string[]): Product[] =>
    baseProds.map(p => ({
      ...p,
      soldOut: soldOutIds.includes(p.id),
      status: soldOutIds.includes(p.id) ? 'soldout' : 'ready'
    }));

  const fetchStatus = async () => {
    // 1. Try Firebase Realtime Database if configured
    if (Boolean(FIREBASE_DB_URL)) {
      try {
        const fbRes = await fetch(String(FIREBASE_DB_URL).replace(/\/$/, '') + '/products-status.json?t=' + Date.now());
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          if (fbData && Array.isArray(fbData.soldOutIds)) {
            setProducts(applyStatus(initialProducts, fbData.soldOutIds));
            return;
          }
        }
      } catch { /* continue */ }
    }

    // 2. Try GitHub Raw directly (fastest source of latest admin commits, bypassing stale Vercel builds)
    try {
      const ghRes = await fetch(GITHUB_PRODUCTS_URL + '?t=' + Date.now());
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        if (ghData?.lastUpdated && ghData.lastUpdated === lastUpdatedRef.current) {
          return; // No change, skip re-render
        }
        if (ghData?.products && Array.isArray(ghData.products)) {
          lastUpdatedRef.current = ghData.lastUpdated || String(Date.now());
          setProducts(ghData.products.map((p: Product) => {
            const isSold = Boolean(p.soldOut || p.status === 'soldout');
            return {
              ...p,
              soldOut: isSold,
              status: isSold ? 'soldout' : 'ready'
            };
          }));
          if (ghData.categories && Array.isArray(ghData.categories)) {
            setCategories(ghData.categories);
          }
          return;
        } else if (ghData?.soldOutIds) {
          setProducts(applyStatus(initialProducts, ghData.soldOutIds));
          return;
        }
      }
    } catch { /* fallback to static products.json */ }

    // 3. Fallback to /products.json (served by local Vite or deployed Vercel)
    try {
      const res = await fetch('/products.json?t=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (data?.lastUpdated && data.lastUpdated === lastUpdatedRef.current) {
          return; // No change, skip re-render
        }
        if (data?.products && Array.isArray(data.products) && data.products.length > 0) {
          lastUpdatedRef.current = data.lastUpdated || String(Date.now());
          const mapped = data.products.map((p: Product) => {
            const isSold = Boolean(p.soldOut || p.status === 'soldout');
            return {
              ...p,
              soldOut: isSold,
              status: isSold ? 'soldout' : 'ready'
            };
          });
          setProducts(mapped);
          if (data.categories && Array.isArray(data.categories)) {
            setCategories(data.categories);
          }
          return;
        }
        if (data?.soldOutIds && Array.isArray(data.soldOutIds)) {
          setProducts(applyStatus(initialProducts, data.soldOutIds));
          return;
        }
      }
    } catch { /* use current */ }
  };

  useEffect(() => {
    fetchStatus();

    // Fast polling (every 3s) for continuous sync
    const timer = setInterval(fetchStatus, 3000);

    // Instant sync when switching back to this tab
    const handleFocus = () => fetchStatus();
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') fetchStatus();
    });

    // 1. Same-browser instant cross-tab sync (0ms)
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('sr12_realtime_sync');
      bc.onmessage = (event) => {
        if (event.data?.type === 'SYNC_PRODUCTS' && event.data.payload?.products) {
          const prods = event.data.payload.products;
          lastUpdatedRef.current = event.data.payload.lastUpdated || String(Date.now());
          setProducts(prods.map((p: Product) => {
            const isSold = Boolean(p.soldOut || p.status === 'soldout');
            return {
              ...p,
              soldOut: isSold,
              status: isSold ? 'soldout' : 'ready'
            };
          }));
          if (event.data.payload.categories) {
            setCategories(event.data.payload.categories);
          }
        }
      };
    } catch {}

    // 2. Global Instant Push via Server-Sent Events (20-50ms)
    let es: EventSource | null = null;
    try {
      es = new EventSource('https://ntfy.sh/sr12-store-sync-jiqqdoy/sse');
      es.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed?.message) {
            const msg = JSON.parse(parsed.message);
            if (msg.soldOutIds && Array.isArray(msg.soldOutIds)) {
              setProducts(prev => applyStatus(prev, msg.soldOutIds));
            }
            fetchStatus();
          }
        } catch {}
      };
    } catch {}

    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
      if (bc) bc.close();
      if (es) es.close();
    };
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
