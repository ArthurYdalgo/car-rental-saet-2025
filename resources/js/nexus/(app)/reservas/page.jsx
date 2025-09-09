import MomentDateTime from '@/components/moment-date-time';
import Table from '@/components/pagination/table';
import TableSortableField from '@/components/pagination/table-sortable-field';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@laravext/react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Reservas',
        href: '/reservas',
    },
];

export default function Dashboard() {
    const [params, setParams] = useState({});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reservas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table
                    endpoint={'/api/rentals'}
                    params={{}}
                    tableHead={({ sortBy, handleClick }) => (
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'created_at'}>
                                        Criado em
                                    </TableSortableField>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                    )}
                    tableBody={(pagination) => {
                        return (
                            <TableBody>
                                {pagination.data.map((rental) => (
                                    <TableRow key={rental.id}>
                                        <TableCell>{rental.id}</TableCell>
                                        <TableCell>
                                            <MomentDateTime date={rental.created_at} />
                                        </TableCell>
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
