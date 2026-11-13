import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#fff0f2]">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-[#f0cdd4] shadow-lg max-w-md">
            <h2 className="text-2xl font-serif font-bold text-[#6b1d2f] mb-3">Memuat Halaman...</h2>
            <p className="text-sm text-[#6b1d2f]/70 mb-6">
              Terjadi sedikit gangguan saat memuat tampilan. Silakan muat ulang halaman.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#6b1d2f] text-white rounded-full text-sm font-semibold hover:bg-[#521624] transition-all shadow-md"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
