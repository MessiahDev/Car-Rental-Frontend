import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';

const BASE = `${BASE_URL}/Reservation`;

export const ReservationService = {
  async getAllReservations(): Promise<AxiosResponse<any[]>> {
    return await axios.get(BASE);
  },

  async getReservationById(id: number): Promise<AxiosResponse<any>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createReservation(reservation: any): Promise<AxiosResponse<any>> {
    return await axios.post(BASE, reservation);
  },

  async updateReservation(id: number, reservation: any): Promise<void> {
    await axios.put(`${BASE}/${id}`, reservation);
  },

  async deleteReservation(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
