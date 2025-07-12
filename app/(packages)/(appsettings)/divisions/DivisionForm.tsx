"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "@/components/ext/form/TextInput";
import { Button } from "@/components/ui/button";
import Window from "@/components/ext/window/Window";

const schema = z.object({
    division_id: z.number().optional(),
    division_code: z.string().min(1),
    division: z.string().min(1),
    vendor_name: z.string().optional(),
    organization_name: z.string().optional(),
});
export type DivisionFormValues = z.infer<typeof schema>;

export default function DivisionForm({
    defaultValues,
    onSubmit,
}: {
    defaultValues?: DivisionFormValues;
    onSubmit: (v: DivisionFormValues) => void;
}) {
    const { control, handleSubmit, formState } = useForm<DivisionFormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <Window
            title="Division Form"
            open={true}
            onClose={() => { }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <TextInput name="division_code" label="Division Code" control={control} />
                <TextInput name="division" label="Division Name" control={control} />
                <TextInput
                    name="vendor_name"
                    label="Vendor Name"
                    control={control}
                    className="md:col-span-2"
                />
                <TextInput
                    name="organization_name"
                    label="Organization Name"
                    control={control}
                    className="md:col-span-2"
                />
                <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" disabled={formState.isSubmitting}>
                        {defaultValues ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Window>
    );
}
