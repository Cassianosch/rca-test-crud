import { TodoData } from '../../interfaces/todo';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';

interface _updateParams {
    id: number;
    data: TodoData;
}

interface TodoServiceProps {
    _getAll(): Promise<TodoData[]>;
    _create(data: TodoData): Promise<void>;
    _update(params: _updateParams): Promise<void>;
    _delete(id: number): Promise<void>;
}

const _getAll = async (): Promise<TodoData[]> => {
    try {
        const { data: plans } = await api.get('todos');

        return plans;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _create = async (data: TodoData): Promise<void> => {
    try {
        await api.post(`todos`, data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _update = async (params: _updateParams): Promise<void> => {
    try {
        await api.put(`todos/${params.id}`, params.data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _delete = async (id: number): Promise<void> => {
    try {
        await api.delete(`todos/${id}`);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const todoServices = (): TodoServiceProps => ({
    _getAll,
    _create,
    _update,
    _delete,
});
