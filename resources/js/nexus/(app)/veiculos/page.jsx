import MomentDateTime from '@/components/moment-date-time';
import Money from '@/components/Money';
import Number from '@/components/Number';
import Table from '@/components/pagination/table';
import TableSortableField from '@/components/pagination/table-sortable-field';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Tab } from '@headlessui/react';
import { Head } from '@laravext/react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Veículos',
        href: '/veiculos',
    },
];

export default function Dashboard() {
    const [params, setParams] = useState({});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Veículos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table
                    endpoint={'/api/vehicles'}
                    params={{}}
                    tableHead={({ sortBy, handleClick }) => (
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'year'}>
                                        Ano
                                    </TableSortableField>
                                </TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'seats'}>
                                        Lugares
                                    </TableSortableField>
                                </TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'trunk_capacity'}>
                                    Volume do Porta-malas
                                    </TableSortableField>
                                    </TableHead>
                                <TableHead>
                                    <TableSortableField handleClick={handleClick} sortBy={sortBy} field={'price_per_day'}>
                                    Preço por Dia
                                    </TableSortableField>
                                    </TableHead>
                            </TableRow>
                        </TableHeader>
                    )}
                    tableBody={(pagination) => {
                        return (
                            <TableBody>
                                {pagination.data.map((vehicle) => (
                                    <TableRow key={vehicle.id}>
                                        <TableCell>{vehicle.id}</TableCell>
                                        <TableCell>{vehicle.name}</TableCell>
                                        <TableCell>{vehicle.year}</TableCell>
                                        <TableCell>{vehicle.seats}</TableCell>
                                        <TableCell>
                                            <Number value={vehicle.trunk_capacity} maximumFractionDigits={0} minimumFractionDigits={0} sufix={'L'} />
                                        </TableCell>
                                        <TableCell>
                                            <Money amount={vehicle.price_per_day} />
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
