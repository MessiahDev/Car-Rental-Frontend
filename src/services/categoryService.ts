import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';

const BASE = `${BASE_URL}/Category`;

export const CategoryService = {
  async getAllCategories(): Promise<AxiosResponse<any[]>> {
    return await axios.get(BASE);
  },

  async getCategoryById(id: number): Promise<AxiosResponse<any>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createCategory(category: any): Promise<AxiosResponse<any>> {
    return await axios.post(BASE, category);
  },

  async updateCategory(id: number, category: any): Promise<void> {
    await axios.put(`${BASE}/${id}`, category);
  },

  async deleteCategory(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
