// components/ext/window/toaster.tsx
"use client";

import { toast } from "sonner"; // Import toast directly from sonner

export function showSuccessToast(message: string) {
    toast.success(message, {
        duration: 3000,
    });
}

export function showErrorToast(message: string) {
    toast.error(message, {
        duration: 3000,
    });
}

// If you need more customization:
export function showCustomToast(
    type: "success" | "error" | "info" | "warning",
    title: string,
    message: string
) {
    toast[type](title, {
        description: message,
        duration: 3000,
    });
}