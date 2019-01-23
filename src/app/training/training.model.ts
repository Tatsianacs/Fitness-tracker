export interface Training {
    id: string;
    name: string;
    userId: string,
    duration: number;
    calories: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}
