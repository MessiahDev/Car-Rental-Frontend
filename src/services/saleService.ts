import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';
import Sale from '../models/Sale';

const BASE = `${BASE_URL}/Sales`;

export const SaleService = {
  async getAllSales(): Promise<AxiosResponse<Sale[]>> {
    return await axios.get(BASE);
  },

  async getSaleById(id: number): Promise<AxiosResponse<Sale>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createSale(sale: Sale): Promise<AxiosResponse<Sale>> {
    return await axios.post(BASE, sale);
  },

  async updateSale(id: number, sale: Sale): Promise<void> {
    await axios.put(`${BASE}/${id}`, sale);
  },

  async deleteSale(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
