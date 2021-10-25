export interface PlanFormData {
    img_resolution: string;
    total_pictures: number | null;
    description: string;
    slug: string;
    price: number;
    name: string;
    color: string;
    total_active_days: number;
    // announcement_size: string;
    announcement_position: number;
    status?: 'ACTIVE' | 'DISABLE';
}

export interface PlanData extends PlanFormData {
    id_plan: number;
    createdAt: string;
    updatedAt: string;
}
