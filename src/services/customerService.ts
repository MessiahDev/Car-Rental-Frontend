import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';

const BASE = `${BASE_URL}/Customer`;

export const CustomerService = {
  async getAllCustomers(): Promise<AxiosResponse<any[]>> {
    return await axios.get(BASE);
  },

  async getCustomerById(id: number): Promise<AxiosResponse<any>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createCustomer(customer: any): Promise<AxiosResponse<any>> {
    return await axios.post(BASE, customer);
  },

  async updateCustomer(id: number, customer: any): Promise<void> {
    await axios.put(`${BASE}/${id}`, customer);
  },

  async deleteCustomer(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
