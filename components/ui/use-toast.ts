// components/ui/use-toast.ts
"use client";

import { toast as sonnerToast, Toaster, ToasterProps } from 'sonner';
import { ReactNode } from 'react';

// 从 ToasterProps 提取 Position 类型
type Position = NonNullable<ToasterProps['position']>;

// 从 ToasterProps 中推断 ToastOptions 类型
type SonnerToastOptions = NonNullable<ToasterProps['toastOptions']>;

// 扩展的 Toast 类型
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'loading';

export interface ToastOptions extends SonnerToastOptions {
  title?: string;
  description?: ReactNode;
  variant?: ToastVariant;
  position?: Position;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// 简化的返回 ID 类型
export type ToastId = string | number;

// 核心 toast 函数
function toast(options: ToastOptions): ToastId {
  const { title, description, variant = 'default', position, action, ...restOptions } = options;
  
  const sonnerOptions = {
    description,
    position,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
    ...restOptions,
  };

  switch (variant) {
    case 'success':
      return sonnerToast.success(title || '', sonnerOptions);
    case 'error':
      return sonnerToast.error(title || '', sonnerOptions);
    case 'warning': 
      return sonnerToast.warning(title || '', sonnerOptions);
    case 'loading':
      return sonnerToast.loading(title || '', sonnerOptions);
    default:
      return sonnerToast(title || '', sonnerOptions);
  }
}

// 简便方法
toast.success = (message: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
  return toast({ title: message, variant: 'success', ...options });
};

toast.error = (message: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
  return toast({ title: message, variant: 'error', ...options });
};

toast.warning = (message: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
  return toast({ title: message, variant: 'warning', ...options });
};

toast.loading = (message: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
  return toast({ title: message, variant: 'loading', ...options });
};

// 添加常用位置的便捷方法
toast.topCenter = (message: string, options?: Omit<ToastOptions, 'title' | 'position'>) => {
  return toast({ title: message, position: 'top-center', ...options });
};

toast.bottomCenter = (message: string, options?: Omit<ToastOptions, 'title' | 'position'>) => {
  return toast({ title: message, position: 'bottom-center', ...options });
};

// Promise 支持
toast.promise = sonnerToast.promise;

// 直接暴露 dismiss 方法
toast.dismiss = sonnerToast.dismiss;

// 自定义 Hook
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    promise: sonnerToast.promise,
  };
}

export { toast };