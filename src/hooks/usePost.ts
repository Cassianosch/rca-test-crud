import { useCallback, useState } from 'react';
import { PostData } from '../interfaces/post';
import { postServices } from '../services/post';
import useCustomToast from './useCustomToast';

interface usePostHookData {
    rows: PostData[];
    handleGetRows(): Promise<void>;
    handleCreate(values: PostData): Promise<void>;
    handleUpdate(id: number, values: PostData): Promise<void>;
    handleDelete(id: number): Promise<void>;
}

export default (): usePostHookData => {
    const [rows, setRows] = useState<PostData[]>([]);

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const { _getAll, _create, _update, _delete } = postServices();

    const handleGetRows = useCallback(async () => {
        try {
            const data = await _getAll();

            setRows(data);
        } catch (err) {
            showErrorToast(err);
        }
    }, [_getAll, showErrorToast]);

    const handleCreate = useCallback(
        async (values: PostData) => {
            try {
                await _create(values);

                await handleGetRows();

                showSuccessToast('Post created with success');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_create, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleUpdate = useCallback(
        async (id: number, values: PostData) => {
            try {
                await _update({ id, data: values });

                await handleGetRows();

                showSuccessToast('Post updated with success');
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

                showSuccessToast('Post deleted with success');
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
