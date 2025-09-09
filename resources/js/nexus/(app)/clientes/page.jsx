import Table from '@/components/pagination/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@laravext/react';
import { useState } from 'react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MomentDateTime from '@/components/moment-date-time';

const breadcrumbs = [
    {
        title: 'Clientes',
        href: '/clientes',
    },
];

export default function Dashboard() {
    const [params, setParams] = useState({});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table
                    endpoint={'/api/customers'}
                    params={{}}
                    tableHead={({ sortBy, handleClick }) => (
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Criado em</TableHead>
                            </TableRow>
                        </TableHeader>
                    )}
                    tableBody={(pagination) => {
                        return (
                            <TableBody>
                                {pagination.data.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell><MomentDateTime date={customer.created_at} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        );
                    }}
                />
            </div>
        </AppLayout>
    );
}
