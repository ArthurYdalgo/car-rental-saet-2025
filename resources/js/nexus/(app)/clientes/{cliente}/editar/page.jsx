import Money from '@/components/Money';
import Number from '@/components/Number';
import Table from '@/components/pagination/table';
import TableSortableField from '@/components/pagination/table-sortable-field';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFilter } from '@/hooks/use-filter';
import { useNonInitialEffect } from '@/hooks/use-non-initial-effect';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@laravext/react';
import { useState } from 'react';
import Form from '../../form';


export default () => {
    
    
    return (
        <AppLayout breadcrumbs={[
            {
                title: 'Clientes',
                href: '/clientes',
            }
        ]}>
            <Head title="Veículos" />
            <Form />        
        </AppLayout>
    );
}
