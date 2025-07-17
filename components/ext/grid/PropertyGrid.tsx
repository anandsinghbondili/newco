// components/ext/grid/PropertyGrid.tsx
"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface PropertyGridProps {
    data: Record<string, string>;
    title?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PropertyGrid({ data, title = "Properties", open, onOpenChange }: PropertyGridProps) {
    // Convert the data object to an array of key-value pairs
    const properties = React.useMemo(() => {
        return Object.entries(data).map(([key, value]) => ({
            key,
            value: value === null || value === undefined ? "N/A" : String(value),
        }));
    }, [data]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[80vh] max-w-screen">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[70vh] pr-4">
                    <Table>
                        <TableBody>
                            {properties.map((prop) => (
                                <TableRow key={prop.key}>
                                    <TableCell className="font-medium w-1/3 bg-muted/50">
                                        {prop.key}
                                    </TableCell>
                                    <TableCell className="w-3xl">
                                        {prop.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}