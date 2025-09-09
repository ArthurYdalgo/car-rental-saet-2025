import Table from '@/components/pagination/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@laravext/react';
import { useEffect, useState } from 'react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MomentDateTime from '@/components/moment-date-time';
import { useFilter } from '@/hooks/use-filter';
import { useNonInitialEffect } from '@/hooks/use-non-initial-effect';
import TableSortableField from '@/components/pagination/table-sortable-field';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Clientes',
        href: '/clientes',
    },
];

export default function Dashboard() {
    const {filters, setFilter} = useFilter({});
    
    const [params, setParams] = useState({
        include: 'rentalsCount,phone',
        filter: filters,
    });

    const refresh = () => {
        setParams({
            ...params,
            filter: filters,
        });
    }

    useNonInitialEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refresh();
        }, 1000);
    
        return () => clearTimeout(delayDebounceFn);
    }, [filters]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table
                    endpoint={'/api/customers'}
                    params={params}
                    tableHead={({ sortBy, handleClick }) => (
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>
                                    <TableSortableField sortBy={sortBy} field="rentals_count" handleClick={handleClick}>
                                        Quantidade de Reservas
                                    </TableSortableField>
                                </TableHead>
                                <TableHead>Criado em</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                    )}
                    tableBody={(pagination) => {
                        return (
                            <TableBody>
                                {pagination.data.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone?.number ?? '--'}</TableCell>
                                        <TableCell>{customer.rentals_count}</TableCell>
                                        <TableCell><MomentDateTime date={customer.created_at} /></TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button asChild variant="default" size="xs">
                                                <Link href={`/clientes/${customer.id}`}>Ver</Link>
                                            </Button>
                                            <Button asChild variant="secondary" size="xs">
                                                <Link href={`/clientes/${customer.id}/editar`}>Editar</Link>
                                            </Button>
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
