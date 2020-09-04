import client from '../client';

export const getScheduleList = async ({ no }) => {
  const response = await client.get(`/branch/${no}/schedule`);
  return response;
};

export const getEmployScheduleList = async ({ id }) => {
  const response = await client.get(`/member/${id}/schedule`);
  return response;
};

export const getSchedule = async ({ no }) => {
  const response = await client.get(`/schedule/${no}`);
  return response;
};

export const postSchedule = async ({ data }) => {
  const response = await client.post('/schedule', data);
  return response;
};

export const updateSchedule = async ({ no, data }) => {
  const response = await client.put(`/schedule/${no}`, data);
  return response;
};

export const deleteSchedule = async ({ no }) => {
  const response = await client.delete(`/schedule/${no}`);
  return response;
};
