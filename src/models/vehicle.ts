/* eslint-disable */
export default class Vehicle implements Shared.IEntity {
    public id: number = 0;
    public vehicleId: number = 0;
    public name: string = '';
    public model: string = '';
    public customerId: number = 0;
    public registerDate: Date | undefined;
    public isActive: boolean = false;
    public status: string = '';
    public categoryId: number = 0;
    public category?: Category;
  }
  
  export interface Category {
     id: number;
  }