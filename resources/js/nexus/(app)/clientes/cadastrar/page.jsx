import { useForm } from '@/hooks/use-form';
import AppLayout from '@/layouts/app-layout';
import { Head, nexusProps, routeParams } from '@laravext/react';
import { useState } from 'react';

import CustomerForm from '../form';

export default () => {

    const { data, setData, errors, reset, processing, setProcessing } = useForm({
        
    });

    const handleSubmit = (e) => {
    }

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Clientes',
                    href: route('clientes'),
                },
                {
                    title: `Cadastrar`,
                    href: route('clientes.cadastrar'),
                },
            ]}
        >
            <Head title="Clientes" />
            <CustomerForm formHook={{data, setData, errors, reset, processing, setProcessing}} onSubmit={handleSubmit} />
        </AppLayout>
    );
};
