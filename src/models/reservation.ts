/* eslint-disable */
export default class Reservation implements Shared.IEntity {
    public id: number = 0;
    public vehicleId: number = 0;
    public customerId: number = 0;
    public startDate: Date = new Date();
    public endDate: Date = new Date();
    public totalPrice: number = 0;
    public isPaid: boolean = false;
    public isActive: boolean = false;
}
