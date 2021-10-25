import { AlbumData } from '../../interfaces/album';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';

interface _updateParams {
    id: number;
    data: AlbumData;
}

interface PostServiceProps {
    _getAll(): Promise<AlbumData[]>;
    _create(data: AlbumData): Promise<void>;
    _update(params: _updateParams): Promise<void>;
    _delete(id: number): Promise<void>;
}

const _getAll = async (): Promise<AlbumData[]> => {
    try {
        const { data: plans } = await api.get('albums');

        return plans;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _create = async (data: AlbumData): Promise<void> => {
    try {
        await api.post(`albums`, data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _update = async (params: _updateParams): Promise<void> => {
    try {
        await api.put(`albums/${params.id}`, params.data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _delete = async (id: number): Promise<void> => {
    try {
        await api.delete(`albums/${id}`);
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
