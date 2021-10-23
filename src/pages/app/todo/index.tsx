import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from '../../../components/Layout';
import { TodoForm } from './form';
import { Table } from '../../../components/Table';
import { TodoData } from '../../../interfaces/todo';
import useTodo from '../../../hooks/useTodo';

export const TodoPage = (): JSX.Element => {
    const [editing, setEditing] = useState<TodoData | null>(null);

    const { rows, handleGetRows, handleCreate, handleUpdate, handleDelete } =
        useTodo();

    useEffect(() => {
        handleGetRows();
    }, [handleGetRows]);

    return (
        <Container title="Todo" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Cadastro de Todos</Heading>
                <TodoForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                />
            </Flex>
            <Heading fontSize="2xl">Todos cadastrados</Heading>
            <Table<TodoData>
                columns={['title', 'completed']}
                data={rows}
                onClickEdit={(row) => setEditing(row)}
                onClickDelete={({ id }) => handleDelete(id)}
                paginationProps={{ total: 0, current: 1 }}
                customRenderers={{
                    completed: (value) => (
                        <Text as="span" fontWeight="normal">
                            {` ${value ? 'True' : 'False'}`}
                        </Text>
                    ),
                }}
            />
        </Container>
    );
};
