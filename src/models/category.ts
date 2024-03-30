/* eslint-disable */
export default class Category implements Shared.IEntity {
    public id: number = 0;
    public group?: string = '';
    public description: string = '';
    public vehicles: Vehicle[] = [];
}

export interface Vehicle {
    id: number;
    name: string;
    image:  string;
    model: string;
    customerId: number;
    registerDate: Date | undefined;
    isActive: boolean;
}
