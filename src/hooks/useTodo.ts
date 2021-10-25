import { useCallback, useState } from 'react';
import { TodoData } from '../interfaces/todo';
import { todoServices } from '../services/todo';
import useCustomToast from './useCustomToast';

interface useTodoHookData {
    rows: TodoData[];
    handleGetRows(): Promise<void>;
    handleCreate(values: TodoData): Promise<void>;
    handleUpdate(id: number, values: TodoData): Promise<void>;
    handleDelete(id: number): Promise<void>;
}

export default (): useTodoHookData => {
    const [rows, setRows] = useState<TodoData[]>([]);

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const { _getAll, _create, _update, _delete } = todoServices();

    const handleGetRows = useCallback(async () => {
        try {
            const data = await _getAll();

            setRows(data);
        } catch (err) {
            showErrorToast(err);
        }
    }, [_getAll, showErrorToast]);

    const handleCreate = useCallback(
        async (values: TodoData) => {
            try {
                await _create(values);

                await handleGetRows();

                showSuccessToast('Task created with success');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_create, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleUpdate = useCallback(
        async (id: number, values: TodoData) => {
            try {
                await _update({ id, data: values });

                await handleGetRows();

                showSuccessToast('Task updated with success');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_update, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleDelete = useCallback(
        async (id: number) => {
            try {
                await _delete(id);

                await handleGetRows();

                showSuccessToast('Task deleted with success');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_delete, handleGetRows, showErrorToast, showSuccessToast],
    );

    return {
        rows,
        handleGetRows,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};
