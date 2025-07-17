'use client';

import AppBarChart from '@/components/common/AppBarChart';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SmartForm } from '@/components/ext/form/SmartForm';
import { SimpleGrid } from '@/components/ext/grid/SimpleGrid';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

interface FormField {
    name: string;
    label: string;
    type: string; // e.g. 'text', 'number', 'checkbox', etc.
    // other properties as needed
}

const dealFields: FormField[] = [
    { name: "deal_header_id", label: "Deal Header ID", type: "text" },
    { name: "deal_number", label: "Deal Number", type: "text" },
    { name: "deal_name", label: "Deal Name", type: "text" },
    { name: "deal_type", label: "Deal Type", type: "text" },
    { name: "vendor_name", label: "Vendor Name", type: "text" },
    { name: "division", label: "Division", type: "text" },
    { name: "deal_start_date", label: "Deal Start Date", type: "date" },
    { name: "deal_end_date", label: "Deal End Date", type: "date" },
    { name: "deal_status", label: "Deal Status", type: "text" },
    { name: "payment_frequency", label: "Payment Frequency", type: "text" },
    { name: "currency", label: "Currency", type: "text" },
    { name: "category_manager", label: "Category Manager", type: "text" },
    { name: "creation_date", label: "Creation Date", type: "date" },
    { name: "last_update_date", label: "Last Update Date", type: "date" },
    { name: "performance_name", label: "Performance Name", type: "text" },
    { name: "claimed_amount", label: "Claimed Amount", type: "number" },
    { name: "claimed_quantity", label: "Claimed Quantity", type: "number" },
    { name: "sales", label: "Sales", type: "number" },
    { name: "max_capped_amount", label: "Max Capped Amount", type: "number" },
    { name: "comments", label: "Comments", type: "text" }
];

const DealDetailsPage = () => {
    return (
        <>
            <Breadcrumb />
            <Card className="grid grid-cols-1 gap-4 p-2 h-full w-full overflow-y-auto">
                <h2 className='text-2xl font-bold p-2'>Deal Details</h2>
                <SmartForm
                    panelTitle='Summary'
                    fields={dealFields}
                    showSubmit={false}
                    showCancel={false}
                    className='h-full w-full'
                    collapsible={true}
                    defaultCollapsed={false}
                />
                <Card
                    className="grid grid-cols-1 gap-4 p-3 h-full w-full overflow-y-auto"
                >
                    <Tabs defaultValue="discountlines">
                        <TabsList className='gap-2 w-full'>
                            <TabsTrigger value="discountlines">
                                Discount Lines
                            </TabsTrigger>
                            <TabsTrigger value="products">
                                Products
                            </TabsTrigger>
                            <TabsTrigger value="qualifiers">
                                Qualifiers
                            </TabsTrigger>
                            <TabsTrigger value="payment_options">
                                Payment Options
                            </TabsTrigger>
                            <TabsTrigger value="summary">
                                Summary
                            </TabsTrigger>
                            <TabsTrigger value="history">
                                History
                            </TabsTrigger>
                            <TabsTrigger value="claims">
                                Claims
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="discountlines" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onAdd={() => { }}
                                onDelete={() => { }}
                                onRefresh={() => { }}
                                onExport={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="products" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onAdd={() => { }}
                                onDelete={() => { }}
                                onRefresh={() => { }}
                                onExport={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="qualifiers" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onAdd={() => { }}
                                onDelete={() => { }}
                                onRefresh={() => { }}
                                onExport={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="payment_options" className='mt-2'>
                            <SmartForm
                                fields={[
                                    { name: "deal_header_id", label: "Deal Header ID", type: "text" },
                                    { name: "deal_number", label: "Deal Number", type: "text" },
                                    { name: "deal_name", label: "Deal Name", type: "text" },
                                    { name: "deal_type", label: "Deal Type", type: "text" },
                                    { name: "vendor_name", label: "Vendor Name", type: "text" }
                                ]}
                                showSubmit={false}
                                showCancel={false}
                                className='h-full w-full p-3'
                                onSubmit={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="summary" className='mt-2'>
                            <AppBarChart />
                        </TabsContent>
                        <TabsContent value="history" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onRefresh={() => { }}
                                onExport={() => { }}
                                enableRowSelection={false}
                            />
                        </TabsContent>
                        <TabsContent value="claims" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onRefresh={() => { }}
                                onExport={() => { }}
                                enableRowSelection={false}
                            />
                        </TabsContent>
                    </Tabs>
                </Card>
            </Card>
        </>
    );
};

export default DealDetailsPage;