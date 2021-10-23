import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from '../../../components/Layout';
import { PlanForm } from './form';
import { Table } from '../../../components/Table';
import { PlanData } from '../../../interfaces/plan';
// import usePlan from '../../../hooks/usePlan';

export const PostPage = (): JSX.Element => {
    const [editing, setEditing] = useState<PlanData | null>(null);

    // const { rows, handleGetRows, handleCreate, handleUpdate, handleDelete } =
    //     usePlan();

    // useEffect(() => {
    //     handleGetRows();
    // }, [handleGetRows]);

    return (
        <Container title="Planos" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Cadastro de planos</Heading>
                {/* <PlanForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                /> */}
            </Flex>
            <Heading fontSize="2xl">Planos cadastrados</Heading>
            {/* <Table<PlanData>
                columns={['name', 'price', 'slug', 'status']}
                data={rows}
                onClickEdit={(row) => setEditing(row)}
                onClickDelete={({ id_plan }) => handleDelete(id_plan)}
                paginationProps={{ total: 0, current: 1 }}
                customRenderers={{
                    price: (value) => (
                        <Text as="span" fontWeight="normal">
                            {` ${Number(value).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}`}
                        </Text>
                    ),
                    status: (value) => (
                        <Text as="span" fontWeight="normal">
                            {' '}
                            {value === 'ACTIVE' ? 'ATIVO' : 'INATIVO'}
                        </Text>
                    ),
                }}
            /> */}
        </Container>
    );
};
