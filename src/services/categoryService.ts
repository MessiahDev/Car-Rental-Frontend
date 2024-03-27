import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';
import Category from '../models/category';

const BASE = `${BASE_URL}/Category`;

export const CategoryService = {
  async getAllCategories(): Promise<AxiosResponse<Category[]>> {
    return await axios.get(BASE);
  },

  async getCategoryById(id: number): Promise<AxiosResponse<Category>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createCategory(category: Category): Promise<AxiosResponse<Category>> {
    return await axios.post(BASE, category);
  },

  async updateCategory(id: number, category: Category): Promise<void> {
    await axios.put(`${BASE}/${id}`, category);
  },

  async deleteCategory(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
