// useDataTable.ts
import { useState } from "react";
import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    VisibilityState,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

export function useDataTable<TData, TValue>(columns: ColumnDef<TData, TValue>[], data: TData[]) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return {
        table,
        setSorting,
        setColumnFilters,
        setColumnVisibility,
        setRowSelection,
        selectedRows: table.getSelectedRowModel().rows,
    };
}
