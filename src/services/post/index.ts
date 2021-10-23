import { PostData } from '../../interfaces/post';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';

interface _updateParams {
    id: number;
    data: PostData;
}

interface PostServiceProps {
    _getAll(): Promise<PostData[]>;
    _create(data: PostData): Promise<void>;
    _update(params: _updateParams): Promise<void>;
    _delete(id: number): Promise<void>;
}

const _getAll = async (): Promise<PostData[]> => {
    try {
        const { data: plans } = await api.get('posts');

        return plans;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _create = async (data: PostData): Promise<void> => {
    try {
        await api.post(`posts`, data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _update = async (params: _updateParams): Promise<void> => {
    try {
        await api.put(`posts/${params.id}`, params.data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _delete = async (id: number): Promise<void> => {
    try {
        await api.delete(`posts/${id}`);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const postServices = (): PostServiceProps => ({
    _getAll,
    _create,
    _update,
    _delete,
});
