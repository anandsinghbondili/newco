// components/common/Breadcrumb.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    homeLabel?: string;
    customPaths?: Record<string, string>;
    hideDefaultPaths?: boolean;
}

export function Breadcrumb({
    homeLabel = 'Home',
    customPaths = {},
    hideDefaultPaths = false,
}: BreadcrumbProps) {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [];

    // Add Home link
    if (!hideDefaultPaths) {
        breadcrumbs.push({
            label: homeLabel,
            href: '/dashboard',
        });
    }

    // Build breadcrumb items
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        // Skip if this is the last segment and we want to hide current page
        if (hideDefaultPaths && index === pathSegments.length - 1) return;

        breadcrumbs.push({
            label: customPaths[segment] || formatSegment(segment),
            href: index === pathSegments.length - 1 ? undefined : currentPath,
        });
    });

    function formatSegment(segment: string): string {
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-4">
            {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                    {crumb.href ? (
                        <Link
                            href={crumb.href}
                            className="hover:text-primary hover:underline transition-colors"
                        >
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                        <ChevronRight className="mx-2 h-4 w-4" />
                    )}
                </div>
            ))}
        </nav>
    );
}