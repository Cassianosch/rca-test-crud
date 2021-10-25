export interface PostFormData {
    title: string;
    body: string;
}


export interface PostData extends PostFormData {
    id: number;
}
