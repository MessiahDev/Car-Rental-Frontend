export default class Customer implements Shared.IEntity {
    public id = 0;
    public name?: string = '';
    public email?: string = '';
    public phone?: string = '';
    public cellPhone?: string = '';
    public address?: string = '';
    public dateOfBirth?: Date;
    public cpf?: string = '';
    public rg?: string = '';
    public drivingLicenseNumber?: string;
  }
