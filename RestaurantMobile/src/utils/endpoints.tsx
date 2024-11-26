const API_URL = 'http://192.168.1.6:8800/api';
export const ENDPOINTS = {
  API_URL: `http://192.168.1.6:8800/`,
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,
  LOGOUT: `${API_URL}/auth/logout`,
  GET_TABLES_ENDPOINT: `${API_URL}/table`,
  GET_DISHS_ENDPOINT: `${API_URL}/dish`,
  CREATE_BOOKING_ENDPOINT: `${API_URL}/booking`,
  GET_PROFILE_USE: `${API_URL}/users/profile/user`,
  GET_BOOKING: (id: any) => `${API_URL}/booking/${id}`,
  GET_BOOKING_BY_USER: (userId: any) => `${API_URL}/booking/user/${userId}`,
  GET_TABLE_WITH_AREA: `${API_URL}/table/areawithtable`,
  VALIDATE_BOOKING : (idTable: any, selectedDate: any) => `${API_URL}/booking/validate/${idTable}/${selectedDate}`,
  GET_NEWS_ENDPOINT: `${API_URL}/new`,
  GET_CHEF_ENDPOINT: (id: any) => `${API_URL}/chef/${id}`,
};

export default API_URL;
