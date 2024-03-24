import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';

const BASE = `${BASE_URL}/Sales`;

export const SaleService = {
  async getAllSales(): Promise<AxiosResponse<any[]>> {
    return await axios.get(BASE);
  },

  async getSaleById(id: number): Promise<AxiosResponse<any>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createSale(sale: any): Promise<AxiosResponse<any>> {
    return await axios.post(BASE, sale);
  },

  async updateSale(id: number, sale: any): Promise<void> {
    await axios.put(`${BASE}/${id}`, sale);
  },

  async deleteSale(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
