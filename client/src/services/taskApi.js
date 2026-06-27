import apiService from './apiService.js';

const taskApi = {
  async getTasks() {
    const response = await apiService.get('');
    return response.data?.data || [];
  },

  async getTaskById(id) {
    const response = await apiService.get(`/${id}`);
    return response.data?.data || null;
  },

  async createTask(task) {
    const response = await apiService.post('', task);
    return response.data?.data || null;
  },

  async updateTask(id, task) {
    const response = await apiService.put(`/${id}`, task);
    return response.data?.data || null;
  },

  async deleteTask(id) {
    const response = await apiService.delete(`/${id}`);
    return response.data?.data || null;
  },
};

export default taskApi;
