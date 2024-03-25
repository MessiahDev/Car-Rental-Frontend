/* eslint-disable */
export default class Category implements Shared.IEntity {
    public id: number = 0;
    public name?: string = '';
    public vehicles: Vehicle[] = [];
}

export interface Vehicle {
    id: number;
}
