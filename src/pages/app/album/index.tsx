import React, { useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Container } from '../../../components/Layout';
import { AlbumForm } from './form';
import { Table } from '../../../components/Table';
import { AlbumData } from '../../../interfaces/album';
import useTodo from '../../../hooks/useTodo';

export const AlbumPage = (): JSX.Element => {
    const [editing, setEditing] = useState<AlbumData | null>(null);

    const { rows, handleGetRows, handleCreate, handleUpdate, handleDelete } =
        useTodo();

    useEffect(() => {
        handleGetRows();
    }, [handleGetRows]);

    return (
        <Container title="Todo" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Registration of Albums</Heading>
                <AlbumForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                />
            </Flex>
            <Heading fontSize="2xl">Registered Albums</Heading>
            <Table<AlbumData>
                columns={['title']}
                data={rows}
                onClickEdit={(row) => setEditing(row)}
                onClickDelete={({ id }) => handleDelete(id)}
                paginationProps={{ total: 0, current: 1 }}
            />
        </Container>
    );
};
