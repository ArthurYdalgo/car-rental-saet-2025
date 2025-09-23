import Money from '@/components/Money';
import Number from '@/components/Number';
import Table from '@/components/pagination/table';
import TableSortableField from '@/components/pagination/table-sortable-field';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFilter } from '@/hooks/use-filter';
import { useNonInitialEffect } from '@/hooks/use-non-initial-effect';
import AppLayout from '@/layouts/app-layout';
import { Head, nexusProps, routeParams } from '@laravext/react';
import { useState } from 'react';
import Form from '../form';


export default () => {
    const [customer, setCustomer] = useState(nexusProps().customer);
    
    return (
        <AppLayout breadcrumbs={[
            {
                title: 'Clientes',
                href: route("clientes"),
            },
            {
                title: `#${customer.id} ${customer.first_name}`,
                href: route("clientes.customer", {customer: customer})
            }
        ]}>
            <Head title="Veículos" />
        </AppLayout>
    );
}
