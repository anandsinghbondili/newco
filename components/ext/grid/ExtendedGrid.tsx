// components/ext/grid/ExtendedGrid.tsx
"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
    ColumnResizeMode,
    ColumnOrderState,
    ColumnPinningState,
    VisibilityState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Download,
    ArrowDown,
    ArrowUp,
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    Columns,
    Filter,
    GripVertical,
    List,
    MoreVertical,
    Settings,
    Menu,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/app/hooks/use-media-query";

interface ExtendedGridProps<T> {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    title?: string;
    pageSize?: number;
    enableColumnResizing?: boolean;
    enableColumnReordering?: boolean;
    enableColumnPinning?: boolean;
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enablePagination?: boolean;
    enableExport?: boolean;
    enableFilters?: boolean;
    enableSorting?: boolean;
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    height?: string;
    width?: string;
    className?: string;
}

export function ExtendedGrid<T>({
    columns,
    data,
    title = "",
    pageSize = 10,
    enableColumnResizing = true,
    enableColumnReordering = true,
    enableColumnPinning = true,
    enableRowSelection = true,
    enableMultiRowSelection = true,
    enablePagination = true,
    enableExport = true,
    enableFilters = true,
    enableSorting = true,
    striped = true,
    bordered = true,
    hoverable = true,
    height = "100%",
    width = "100%",
    className = "",
}: ExtendedGridProps<T>) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [sorting, setSorting] = React.useState<import("@tanstack/react-table").SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<import("@tanstack/react-table").ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState<import("@tanstack/react-table").RowSelectionState>({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(columns.map((_, i) => `column${i}`));
    const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({});
    const [columnResizeMode, setColumnResizeMode] = React.useState<ColumnResizeMode>("onChange");
    const [globalFilter, setGlobalFilter] = React.useState("");

    // Responsive column visibility
    React.useEffect(() => {
        if (isMobile) {
            // Hide less important columns on mobile
            const mobileVisibleColumns = columns.reduce((acc, column, index) => {
                if (index < 2) { // Show first 2 columns by default on mobile
                    acc[column.id as string] = true;
                }
                return acc;
            }, {} as VisibilityState);
            setColumnVisibility(mobileVisibleColumns);
        } else {
            // Show all columns on desktop
            setColumnVisibility(columns.reduce((acc, column) => {
                acc[column.id as string] = true;
                return acc;
            }, {} as VisibilityState));
        }
    }, [isMobile, columns]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            columnVisibility,
            columnOrder,
            columnPinning,
            globalFilter,
        },
        onSortingChange: enableSorting ? setSorting : undefined,
        onColumnFiltersChange: enableFilters ? setColumnFilters : undefined,
        onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onColumnPinningChange: setColumnPinning,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getFilteredRowModel: enableFilters ? getFilteredRowModel() : undefined,
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        columnResizeMode,
    });

    React.useEffect(() => {
        if (pageSize) {
            table.setPageSize(pageSize);
        }
    }, [pageSize, table]);

    const exportToExcel = () => {
        const exportData = table.getFilteredRowModel().rows.map((row) => row.original);
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${title || "data"}.xlsx`);
    };

    const resetFilters = () => {
        table.resetColumnFilters();
        setGlobalFilter("");
    };

    const resetSorting = () => {
        table.resetSorting();
    };

    const resetAll = () => {
        resetFilters();
        resetSorting();
        table.resetColumnOrder();
        table.resetColumnVisibility();
        table.resetColumnPinning();
    };

    return (
        <div className={cn("flex flex-col h-full w-full", className)} style={{ width, height }}>
            {/* Header with title and controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-2">
                <h2 className="text-lg md:text-xl font-semibold truncate">{title}</h2>

                <div className="flex flex-wrap gap-2">
                    {enableFilters && (
                        <div className="relative flex-1 min-w-[150px] max-w-[300px]">
                            <Input
                                placeholder="Search..."
                                value={globalFilter ?? ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="h-8 w-full"
                            />
                            <Filter className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                        </div>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                                {isMobile ? <Menu className="h-4 w-4" /> : (
                                    <>
                                        <Settings className="h-4 w-4 mr-2" />
                                        Settings
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuLabel>Table Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!isMobile && (
                                <>
                                    <DropdownMenuCheckboxItem
                                        checked={enableColumnResizing}
                                        onCheckedChange={(value) => setColumnResizeMode(value ? "onChange" : "onEnd")}
                                    >
                                        Column Resizing
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={enableColumnReordering}
                                        onCheckedChange={(value) => { }}
                                        disabled={!enableColumnReordering}
                                    >
                                        Column Reordering
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={enableColumnPinning}
                                        onCheckedChange={(value) => { }}
                                        disabled={!enableColumnPinning}
                                    >
                                        Column Pinning
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            <DropdownMenuItem onClick={resetFilters}>Reset Filters</DropdownMenuItem>
                            <DropdownMenuItem onClick={resetSorting}>Reset Sorting</DropdownMenuItem>
                            <DropdownMenuItem onClick={resetAll}>Reset All</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                                {isMobile ? <Columns className="h-4 w-4" /> : (
                                    <>
                                        <Columns className="h-4 w-4 mr-2" />
                                        Columns
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {enableExport && (
                        <Button variant="outline" size="sm" onClick={exportToExcel} className="h-8">
                            {isMobile ? <Download className="h-4 w-4" /> : (
                                <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>

            {/* Grid Container */}
            <div className={cn(
                "flex-1 min-h-0 overflow-auto border rounded-lg relative",
                bordered && "border",
                striped && "[&_tr:nth-child(even)]:bg-muted/10",
                hoverable && "[&_tr:hover]:bg-muted/50"
            )}>
                <Table className="w-full">
                    <TableHeader className="sticky top-0 bg-background z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const canSort = enableSorting && header.column.getCanSort();
                                    const sortDir = header.column.getIsSorted();
                                    return (
                                        <TableHead
                                            key={header.id}
                                            onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                            className={cn(
                                                "relative group",
                                                canSort && "cursor-pointer",
                                                header.column.getIsPinned() && "sticky bg-background",
                                                isMobile && "min-w-[120px]" // Ensure headers are wide enough on mobile
                                            )}
                                            style={{
                                                width: header.getSize(),
                                                left: header.column.getIsPinned() === "left" ? `${header.getStart()}px` : undefined,
                                                right: header.column.getIsPinned() === "right" ? `${header.getLeafHeaders()[0].getSize()}px` : undefined,
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 truncate">
                                                    {!isMobile && enableColumnReordering && (
                                                        <GripVertical className="w-3 h-3 mr-1 text-muted-foreground cursor-grab" />
                                                    )}
                                                    <span className="truncate">
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </span>
                                                    {canSort && sortDir === "asc" && <ArrowUp className="w-3 h-3 ml-1" />}
                                                    {canSort && sortDir === "desc" && <ArrowDown className="w-3 h-3 ml-1" />}
                                                </div>
                                                {!isMobile && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                                                <MoreVertical className="h-3 w-3" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {enableSorting && (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() => header.column.toggleSorting(false)}
                                                                    >
                                                                        <ArrowUp className="mr-2 h-3.5 w-3.5" />
                                                                        Sort Ascending
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => header.column.toggleSorting(true)}
                                                                    >
                                                                        <ArrowDown className="mr-2 h-3.5 w-3.5" />
                                                                        Sort Descending
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => header.column.clearSorting()}
                                                                        disabled={!header.column.getIsSorted()}
                                                                    >
                                                                        <List className="mr-2 h-3.5 w-3.5" />
                                                                        Clear Sort
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                </>
                                                            )}
                                                            {enableColumnPinning && !isMobile && (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() => header.column.pin("left")}
                                                                        disabled={header.column.getIsPinned() === "left"}
                                                                    >
                                                                        Pin Left
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => header.column.pin("right")}
                                                                        disabled={header.column.getIsPinned() === "right"}
                                                                    >
                                                                        Pin Right
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => header.column.pin(false)}
                                                                        disabled={!header.column.getIsPinned()}
                                                                    >
                                                                        Unpin
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                </>
                                                            )}
                                                            <DropdownMenuItem
                                                                onClick={() => header.column.toggleVisibility(false)}
                                                            >
                                                                Hide Column
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </div>
                                            {enableFilters && header.column.getCanFilter() && !isMobile && (
                                                <Input
                                                    type="text"
                                                    placeholder="Filter..."
                                                    value={(header.column.getFilterValue() as string) ?? ""}
                                                    onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                    className="mt-1 h-8 w-full"
                                                />
                                            )}
                                            {enableColumnResizing && !isMobile && (
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className={`absolute right-0 top-0 h-full w-1 bg-border cursor-col-resize select-none touch-none opacity-0 group-hover:opacity-100 ${header.column.getIsResizing() ? "bg-primary opacity-100" : ""
                                                        }`}
                                                />
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(
                                        hoverable && "hover:bg-muted/50",
                                        striped && "even:bg-muted/10",
                                        row.getIsSelected() && "bg-primary/10"
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                cell.column.getIsPinned() && "sticky bg-background",
                                                "max-w-[200px] overflow-hidden text-ellipsis"
                                            )}
                                            style={{
                                                left: cell.column.getIsPinned() === "left" ? `${cell.column.getStart()}px` : undefined,
                                                right: cell.column.getIsPinned() === "right" ? `${cell.column.getAfter()}px` : undefined,
                                            }}
                                        >
                                            <div className="truncate">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {enablePagination && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-2">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronFirst className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronLast className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <span className="text-sm">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm hidden md:inline">Go to page:</span>
                            <Input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                                className="w-16 h-8"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    Show {table.getState().pagination.pageSize}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {[10, 20, 30, 40, 50].map((size) => (
                                    <DropdownMenuItem
                                        key={size}
                                        onClick={() => table.setPageSize(size)}
                                    >
                                        Show {size}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExtendedGrid;