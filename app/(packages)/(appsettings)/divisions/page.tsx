"use client";

import { useEffect, useState } from "react";
import DivisionGrid, { DivisionRow } from "./DivisionGrid";
import { deleteDivision } from "./actions";
import { Panel } from "@/components/ext/containers/Panel";
import ConfirmDialog from "@/components/ext/window/Alert";
import DivisionForm from "./DivisionForm";
import Loading from "@/app/loading";

export default function DivisionsPage() {
    const [rows, setRows] = useState<DivisionRow[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showFormDialog, setShowFormDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");

    useEffect(() => {
        fetch("/data/AppSettings/Common/Divisions.json")
            .then((r) => r.json())
            .then((j) => {
                setRows(j.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async () => {
        if (!selectedId) return;
        await deleteDivision(selectedId);
        setRows((prev) => prev.filter((r) => r.id !== selectedId));
        setSelectedId(null);
        setShowDeleteDialog(false);
    };

    const handleFormSubmit = (values: any) => {
        console.log("Form submitted:", values);
        // Add your create/update logic here
        setShowFormDialog(false);
        // Refresh data or update local state
    };

    const openCreateForm = () => {
        setFormMode("create");
        setShowFormDialog(true);
    };

    const openEditForm = () => {
        if (!selectedId) return;
        setFormMode("edit");
        setShowFormDialog(true);
    };

    const selectedDivision = rows.find(r => r.id === selectedId);

    if (loading) {
        // return <div>Loading...</div>;
        <Loading />
    }

    return (
        <>
            <Panel
                title="Divisions"
                onCreate={openCreateForm}
                onEdit={selectedId ? openEditForm : undefined}
                onDelete={selectedId ? () => setShowDeleteDialog(true) : undefined}
            >
                <DivisionGrid
                    data={rows}
                    onRowSelect={setSelectedId}
                    selectedId={selectedId}
                />
            </Panel>

            {/* Form Dialog */}
            {showFormDialog && (
                <ConfirmDialog
                    open={true}
                    onConfirm={() => setShowFormDialog(false)}
                    title={formMode === "create" ? "Create Division" : "Edit Division"}
                    description=""
                    confirmLabel="Save"
                    cancelLabel="Cancel"
                >
                    <DivisionForm
                        defaultValues={formMode === "edit" ? selectedDivision : undefined}
                        onSubmit={handleFormSubmit}
                    />
                </ConfirmDialog>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Division"
                description="Are you sure you want to delete this division?"
                destructive
            />
        </>
    );
}