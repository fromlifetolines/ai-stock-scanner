"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  errorMessage?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
          return this.props.fallback;
      }
      return (
        <div className="vision-card p-6 flex flex-col items-center justify-center min-h-[200px] border-rose-500/20 bg-rose-500/5">
            <AlertTriangle className="w-8 h-8 text-rose-400 mb-3 drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
            <p className="text-rose-200 font-bold tracking-wide">
                {this.props.errorMessage || "⚠️ 組件載入失敗"}
            </p>
            <button
                className="mt-4 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-sm font-semibold transition-colors border border-rose-500/30"
                onClick={() => this.setState({ hasError: false })}
            >
                重試 (Retry)
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}
