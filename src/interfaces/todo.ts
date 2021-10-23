export interface TodoFormData {
    title: string;
    completed: boolean;
}


export interface TodoData extends TodoFormData {
    id: number;
}
