"use client";

import { toast, type ToastT } from "sonner";

export const showSuccessToast = (message: string): void => {
    toast.success(message, {
        duration: 3000,
        position: "top-right",
    });
};

export const showErrorToast = (message: string): void => {
    toast.error(message, {
        duration: 3000,
        position: "top-right",
    });
};

type ToastType = "success" | "error" | "info" | "warning";

export const showCustomToast = (
    type: ToastType,
    title: string,
    message?: string,
    options?: Partial<ToastT>
): void => {
    toast[type](title, {
        description: message,
        duration: 3000,
        position: "top-right",
        ...options,
    });
};

// Additional utility toasts
export const showLoadingToast = (message: string): string | number => {
    return toast.loading(message, {
        position: "top-right",
        duration: 3000,
    });
};

export const dismissToast = (id: string | number): void => {
    toast.dismiss(id);
};