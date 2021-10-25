import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from '../../../components/Layout';
import { PostForm } from './form';
import { Table } from '../../../components/Table';
import { PostData } from '../../../interfaces/post';
import usePost from '../../../hooks/usePost';

export const PostPage = (): JSX.Element => {
    const [editing, setEditing] = useState<PostData | null>(null);

    const { rows, handleGetRows, handleCreate, handleUpdate, handleDelete } =
        usePost();

    useEffect(() => {
        handleGetRows();
    }, [handleGetRows]);

    return (
        <Container title="Post" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Registration of Posts</Heading>
                <PostForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                />
            </Flex>
            <Heading fontSize="2xl">Registered Posts</Heading>
            <Table<PostData>
                columns={['title', 'body']}
                data={rows}
                onClickEdit={(row) => setEditing(row)}
                onClickDelete={({ id }) => handleDelete(id)}
                paginationProps={{ total: 0, current: 1 }}
            />
        </Container>
    );
};
