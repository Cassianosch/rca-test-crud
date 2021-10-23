import React, { useCallback, useEffect } from 'react';
import { Button, Flex, Grid, GridItem, Text, useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PlanData, PlanFormData } from '../../../../interfaces/plan';
import { FormInput } from '../../../../components/Form/Input';
import { FormInputCurrency } from '../../../../components/Form/Input/Currency';
import { FormSelect } from '../../../../components/Form/Select';
import { statusOptions } from './data';

const planFormSchema: yup.SchemaOf<PlanFormData> = yup.object().shape({
    img_resolution: yup.string().required('Resolução obrigatória'),
    total_pictures: yup.number().nullable(),
    description: yup.string().required('Descrição obrigatória'),
    slug: yup.string().required('Slug obrigatória'),
    price: yup
        .number()
        .required('Valor obrigatório')
        .typeError('Valor obrigatório'),
    name: yup.string().required('Nome obrigatório'),
    color: yup.string().required('Cor obrigatória'),
    total_active_days: yup
        .number()
        .required('Total de dias obrigatório')
        .typeError('Total de dias obrigatório'),
    // announcement_size: yup.string().required('Tamanho do anúncio obrigatório'),
    announcement_position: yup
        .number()
        .required('Posição do anúncio obrigatória')
        .typeError('Posição do anúncio obrigatória'),
    status: yup.mixed(),
});

interface PlanFormProps {
    editing: PlanData | null;
    setEditing: React.Dispatch<React.SetStateAction<PlanData | null>>;
    handleCreate(values: PlanFormData): Promise<void>;
    handleUpdate(id_master: number, values: PlanFormData): Promise<void>;
}

export const PlanForm = (props: PlanFormProps): JSX.Element => {
    const { editing, setEditing, handleCreate, handleUpdate } = props;

    const toast = useToast();

    const {
        register,
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PlanFormData>({
        resolver: yupResolver(planFormSchema),
    });

    const onSubmit = useCallback<SubmitHandler<PlanFormData>>(
        async (data) => {
            try {
                if (editing) await handleUpdate(editing.id_plan, data);
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
            Object.keys(editing).forEach((key: keyof PlanFormData) => {
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
            templateColumns="repeat(6, 1fr)"
            gridColumnGap="4"
            gridGap="4">
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    name="img_resolution"
                    label="Qualidade das imagens"
                    error={errors.img_resolution}
                    placeholder="1440p"
                    {...register('img_resolution')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    name="total_pictures"
                    label="Quantidade de imagens"
                    error={errors.total_pictures}
                    placeholder="50"
                    rightContent="unidades"
                    {...register('total_pictures')}
                />
            </GridItem>
            <GridItem colSpan={6}>
                <FormInput
                    name="description"
                    label="Descrição"
                    error={errors.description}
                    placeholder="Tenha seus anúncios ativos por 30 dias"
                    {...register('description')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3, md: 2 }}>
                <FormInput
                    name="slug"
                    label="Slug"
                    error={errors.slug}
                    placeholder="slug-basic"
                    {...register('slug')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3, md: 2 }}>
                <FormInput
                    name="name"
                    label="Nome"
                    error={errors.name}
                    placeholder="Básico"
                    {...register('name')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 2 }}>
                <Controller
                    render={({ field }) => (
                        <FormInputCurrency
                            name="price"
                            label="Preço"
                            error={errors.price}
                            {...field}
                        // onChange={handleChangePrice}
                        />
                    )}
                    name="price"
                    control={control}
                />
            </GridItem>
            <GridItem colSpan={{ base: 2, lg: 1 }}>
                <FormInput
                    name="color"
                    label="Cor"
                    error={errors.color}
                    type="color"
                    {...register('color')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 4, lg: 5 }}>
                <FormInput
                    name="total_active_days"
                    label="Duração"
                    error={errors.total_active_days}
                    placeholder="5"
                    rightContent="dias"
                    {...register('total_active_days')}
                />
            </GridItem>
            {/* <GridItem colSpan={{ base: 6, sm: 3, md: 2, '2xl': 2 }}>
                <FormInput
                    name="announcement_size"
                    label="Tamanho do anúncio"
                    error={errors.announcement_size}
                    placeholder="MEDIUM"
                    {...register('announcement_size')}
                />
            </GridItem> */}
            <GridItem colSpan={{ base: 6, sm: 3, md: 3, '2xl': 3 }}>
                <FormInput
                    name="announcement_position"
                    label="Posição do anúncio"
                    error={errors.announcement_position}
                    placeholder="0"
                    {...register('announcement_position')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 3 }}>
                <FormSelect
                    name="status"
                    label="Status do anúncio"
                    options={statusOptions}
                    error={errors.status}
                    {...register('status')}
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
