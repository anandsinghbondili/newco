"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { createDivision, editDivision } from "../actions";
import DivisionForm from "../DivisionForm";

export default function DivisionFormPage() {
    const id = Number(useSearchParams().get("id"));
    const router = useRouter();
    const isEdit = !!id;

    const onSubmit = async (data: any) => {
        if (isEdit) {
            await editDivision(id, data);
        } else {
            await createDivision(data);
        }
        router.back(); // return to grid
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold mb-4">
                {isEdit ? "Edit Division" : "Create Division"}
            </h1>
            <DivisionForm onSubmit={onSubmit} />
        </div>
    );
}
