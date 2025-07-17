// app/loading.tsx
// Global route‑segment loader for Next.js App Router
// Displays a full‑page load mask using TailwindCSS, ShadCN primitives & Lucide icon.

"use client";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
            {/* Optional logo & spinner card */}
            <div className="flex flex-col items-center gap-4 animate-fade-in">
                <div className="flex items-center gap-4">
                    {/* <Image
                        src="/newco_logo.png"
                        width={32}
                        height={32}
                        alt="Logo"
                        className="animate-fade-in"
                    /> */}
                    <h1 className="text-2xl font-semibold">Loading...</h1>
                </div>
                {/* <Loader2 className="animate-spin" /> */}
            </div>
        </div>
    );
}

/*
 * Notes / Usage
 * ───────────────────────────────────────────────────────────────────────────
 * 1. Place this file at `app/loading.tsx` (or inside any route segment) and
 *    Next‑JS will automatically show it while the parallel route server code
 *    or client components hydrate.
 * 2. Tailwind utility `animate-fade-in` expects the following in globals:
 *      @keyframes fade-in { from {opacity:0} to {opacity:1} }
 *      .animate-fade-in { @apply motion-safe:animate-[fade-in_0.4s_ease-in]; }
 * 3. Replace `/newco_logo.png` with your own asset or remove <Image /> if not needed.
 */
