'use client';

import React from 'react'
import TracingSummary from './summary/page'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();

    const handleDEtails = () => {
        router.push("/tracing/details");
    }
    return (
        <div>
            <h1 className='text-2xl font-bold p-2 ml-5'>
                Tracing
            </h1>
            <TracingSummary />
            <Button variant="secondary" onClick={handleDEtails}>Details</Button>
        </div>
    )
}

export default page