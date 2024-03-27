import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';
import Customer from '../models/customer';

const BASE = `${BASE_URL}/Customer`;

export const CustomerService = {
  async getAllCustomers(): Promise<AxiosResponse<Customer[]>> {
    return await axios.get(BASE);
  },

  async getCustomerById(id: number): Promise<AxiosResponse<Customer>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createCustomer(customer: Customer): Promise<AxiosResponse<Customer>> {
    return await axios.post(BASE, customer);
  },

  async updateCustomer(id: number, customer: Customer): Promise<void> {
    await axios.put(`${BASE}/${id}`, customer);
  },

  async deleteCustomer(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
