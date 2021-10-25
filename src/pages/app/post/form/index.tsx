import React, { useCallback, useEffect } from 'react';
import { Button, Flex, Grid, GridItem, Text, useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostData, PostFormData } from '../../../../interfaces/post';
import { FormInput } from '../../../../components/Form/Input';

const postFormSchema: yup.SchemaOf<PostFormData> = yup.object().shape({
    title: yup.string().required('Title is mandatory'),
    body: yup.string().required('Body is mandatory'),
});

interface PostFormProps {
    editing: PostData | null;
    setEditing: React.Dispatch<React.SetStateAction<PostData | null>>;
    handleCreate(values: PostFormData): Promise<void>;
    handleUpdate(id: number, values: PostFormData): Promise<void>;
}

export const PostForm = (props: PostFormProps): JSX.Element => {
    const { editing, setEditing, handleCreate, handleUpdate } = props;

    const toast = useToast();

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostFormData>({
        resolver: yupResolver(postFormSchema),
    });

    const onSubmit = useCallback<SubmitHandler<PostFormData>>(
        async (data) => {
            try {
                if (editing) await handleUpdate(editing.id, data);
                else await handleCreate(data);
                setEditing(null);
                reset();
            } catch (err) {
                toast({
                    status: 'error',
                    title: `Error`,
                    description: err,
                    isClosable: true,
                });
            }
        },
        [editing, handleCreate, handleUpdate, reset, setEditing, toast],
    );

    useEffect(() => {
        if (editing) {
            Object.keys(editing).forEach((key: keyof PostFormData) => {
                if (key in postFormSchema.fields) {
                    setValue(key, editing[key]);
                }
            });
        } else reset();
    }, [editing, setValue, reset]);


    return (
        <Grid
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            templateColumns="repeat(6, 1fr)"
            gridColumnGap="4"
            gridGap="4">
            <GridItem colSpan={6}>
                <FormInput
                    name="title"
                    label="Title"
                    error={errors.title}
                    placeholder="Title"
                    {...register('title')}
                />
            </GridItem>
            <GridItem colSpan={6}>
                <FormInput
                    name="body"
                    label="Body"
                    error={errors.title}
                    placeholder="Body"
                    {...register('body')}
                />
            </GridItem>
            <GridItem colSpan={6}>
                <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    gridGap="4">
                    {editing && (
                        <Button
                            type="button"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => setEditing(null)}>
                            <Text fontSize="sm" fontWeight="normal">
                                Cancel Edit
                            </Text>
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="form-submit"
                        isLoading={isSubmitting}>
                        <Text>Save</Text>
                    </Button>
                </Flex>
            </GridItem>
        </Grid>
    );
};
