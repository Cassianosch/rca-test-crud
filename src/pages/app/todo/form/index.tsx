import React, { useCallback, useEffect } from 'react';
import { Button, Flex, Grid, GridItem, Text, useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TodoData, TodoFormData } from '../../../../interfaces/todo';
import { FormInput } from '../../../../components/Form/Input';
import { FormSelect } from '../../../../components/Form/Select';
import { statusOptions } from './data';

const planFormSchema: yup.SchemaOf<TodoFormData> = yup.object().shape({
    title: yup.string().required('Title is mandatory'),
    completed: yup.boolean(),
});

interface TodoFormProps {
    editing: TodoData | null;
    setEditing: React.Dispatch<React.SetStateAction<TodoData | null>>;
    handleCreate(values: TodoFormData): Promise<void>;
    handleUpdate(id: number, values: TodoFormData): Promise<void>;
}

export const TodoForm = (props: TodoFormProps): JSX.Element => {
    const { editing, setEditing, handleCreate, handleUpdate } = props;

    const toast = useToast();

    const {
        register,
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TodoFormData>({
        resolver: yupResolver(planFormSchema),
    });

    const onSubmit = useCallback<SubmitHandler<TodoFormData>>(
        async (data) => {
            try {
                if (editing) await handleUpdate(editing.id, data);
                else await handleCreate(data);
                setEditing(null);
                reset();
            } catch (err) {
                toast({
                    status: 'error',
                    title: `Erro`,
                    description: err,
                    isClosable: true,
                });
            }
        },
        [editing, handleCreate, handleUpdate, reset, setEditing, toast],
    );

    useEffect(() => {
        if (editing) {
            Object.keys(editing).forEach((key: keyof TodoFormData) => {
                if (key in planFormSchema.fields) {
                    setValue(key, editing[key]);
                }
            });
        } else reset();
    }, [editing, setValue, reset]);


    return (
        <Grid
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            templateColumns="1fr"
            gridColumnGap="4"
            gridGap="4">
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    name="title"
                    label="Title"
                    error={errors.title}
                    placeholder="Title"
                    {...register('title')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 3 }}>
                <FormSelect
                    name="completed"
                    label="Status"
                    options={statusOptions}
                    error={errors.completed}
                    {...register('completed')}
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
                                Cancelar edição
                            </Text>
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="form-submit"
                        isLoading={isSubmitting}>
                        <Text>Salvar</Text>
                    </Button>
                </Flex>
            </GridItem>
        </Grid>
    );
};
