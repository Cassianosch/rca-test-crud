import { useCallback, useState } from 'react';
import { AlbumData } from '../interfaces/album';
import { albumServices } from '../services/album';
import useCustomToast from './useCustomToast';

interface albumFormSchema {
    rows: AlbumData[];
    handleGetRows(): Promise<void>;
    handleCreate(values: AlbumData): Promise<void>;
    handleUpdate(id: number, values: AlbumData): Promise<void>;
    handleDelete(id: number): Promise<void>;
}

export default (): albumFormSchema => {
    const [rows, setRows] = useState<AlbumData[]>([]);

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const { _getAll, _create, _update, _delete } = albumServices();

    const handleGetRows = useCallback(async () => {
        try {
            const data = await _getAll();

            setRows(data);
        } catch (err) {
            showErrorToast(err);
        }
    }, [_getAll, showErrorToast]);

    const handleCreate = useCallback(
        async (values: AlbumData) => {
            try {
                await _create(values);

                await handleGetRows();

                showSuccessToast('Album created with success');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_create, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleUpdate = useCallback(
        async (id: number, values: AlbumData) => {
            try {
                await _update({ id, data: values });

                await handleGetRows();

                showSuccessToast('Album updated with success');
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

                showSuccessToast('Album deleted with success');
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
