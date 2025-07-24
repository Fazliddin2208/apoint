export interface ColorType {
    color?: string;
    colors_id: number;
    name: string;
}

export interface ItemType {
    category: string;
    parent: string;
    remind_start_amount: number;
    remind_start_sum: number;
    remind_income_amount: number;
    remind_income_sum: number;
    remind_outgo_amount: number;
    remind_outgo_sum: number;
    remind_end_amount: number;
    remind_end_sum: number;
    color?: ColorType;
}