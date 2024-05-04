/* eslint-disable */
export default class Vehicle implements Shared.IEntity {
    public id: number = 0;
    public name: string = '';
    public model: string = '';
    public customerId: number = 0;
    public registerDate: string = '';
    public isActive: boolean = false;
    public categoryId: number = 0;
  }
  
  export interface Category {
     id: number;
  }