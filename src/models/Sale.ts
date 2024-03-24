/* eslint-disable */
export default class Sale implements Shared.IEntity {
    public id: number = 0;
    public salesPeopleId: number = 0;
    public vehicleId: number = 0;
    public amount: number = 0;
    public saleDate: Date = new Date();
    public paymentMethod?: string;
    public customerName?: string;
    public customerEmail?: string;
    public customerPhone?: string;
    public notes?: string;
    public salesPersonId: number = 0;
    public salesPerson?: SalesPerson;
}

export interface SalesPerson {
    id: number;
    // Adicione outras propriedades conforme necessário
}
