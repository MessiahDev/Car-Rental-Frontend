import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';

const BASE = `${BASE_URL}/Vehicles`;

export const VehicleService = {
  async getAllVehicles(): Promise<AxiosResponse<any[]>> {
    return await axios.get(BASE);
  },

  async getVehicleById(id: number): Promise<AxiosResponse<any>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async getVehicleCount(): Promise<AxiosResponse<any>> {
    return await axios.get(`${BASE}/count`);
  },

  async createVehicle(vehicle: any): Promise<AxiosResponse<any>> {
    return await axios.post(BASE, vehicle);
  },

  async updateVehicle(id: number, vehicle: any): Promise<void> {
    await axios.put(`${BASE}/${id}`, vehicle);
  },

  async deleteVehicle(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
