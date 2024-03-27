import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../apiConfig/apiConfig';
import Reservation from '../models/reservation';

const BASE = `${BASE_URL}/Reservation`;

export const ReservationService = {
  async getAllReservations(): Promise<AxiosResponse<Reservation[]>> {
    return await axios.get(BASE);
  },

  async getReservationById(id: number): Promise<AxiosResponse<Reservation>> {
    return await axios.get(`${BASE}/${id}`);
  },

  async createReservation(reservation: Reservation): Promise<AxiosResponse<Reservation>> {
    return await axios.post(BASE, reservation);
  },

  async updateReservation(id: number, reservation: Reservation): Promise<void> {
    await axios.put(`${BASE}/${id}`, reservation);
  },

  async deleteReservation(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  }
};
