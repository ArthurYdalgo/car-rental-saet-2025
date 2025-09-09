import If from '@/components/if';
import MomentDate from '@/components/moment-date';
import Money from '@/components/money';
import Table from '@/components/pagination/table';
import TableSortableField from '@/components/pagination/table-sortable-field';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFilter } from '@/hooks/use-filter';
import { useNonInitialEffect } from '@/hooks/use-non-initial-effect';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@laravext/react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Reservas',
        href: '/reservas',
    },
];

export default function Dashboard() {
    const { filters, setFilter } = useFilter({});

    const [params, setParams] = useState({
        include: 'vehicle,customer',
        filter: filters,
    });

    const refresh = () => {
        setParams({
            ...params,
            filter: filters,
        });
    };

    useNonInitialEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refresh();
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [filters]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reservas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table
                    endpoint={'/api/rentals'}
                    params={params}
                    tableHead={({ sortBy, handleClick }) => (
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Veículo</TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'start_date'}>
                                        Data de Início
                                    </TableSortableField>
                                </TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'end_date'}>
                                        Data de Encerramento
                                    </TableSortableField>
                                </TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'created_at'}>
                                        Criado em
                                    </TableSortableField>
                                </TableHead>
                                <TableHead></TableHead>
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
                                            <TextLink>{rental.customer.name}</TextLink>
                                        </TableCell>
                                        <TableCell>
                                            <TextLink>
                                                {rental.vehicle.name} ({rental.vehicle.color.name}, {rental.vehicle.year}){' '}
                                                {rental.vehicle.license_plate}
                                            </TextLink>
                                        </TableCell>

                                        <TableCell>
                                            <MomentDate date={rental.start_date} />
                                        </TableCell>
                                        <TableCell>
                                            <MomentDate date={rental.end_date} />
                                        </TableCell>

                                        <TableCell>
                                            <Money amount={rental.price} />
                                        </TableCell>

                                        <TableCell>
                                            <MomentDate date={rental.created_at} />
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button asChild variant="default" size="xs">
                                                <Link href={`/reservas/${rental.id}`}>Ver</Link>
                                            </Button>
                                            <Button asChild variant="secondary" size="xs">
                                                <Link href={`/reservas/${rental.id}/editar`}>Editar</Link>
                                            </Button>
                                            <If condition={!rental.canceled_at}>
                                                <Button variant="destructive" size="xs">
                                                    Cancelar
                                                </Button>
                                            </If>

                                            <If condition={rental.canceled_at}>
                                                <Button variant="orange" size="xs">
                                                    Restaurar
                                                </Button>
                                            </If>
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
