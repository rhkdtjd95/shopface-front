import client from '../client';

export const getAlarmList = async ({ id }) => {
  const response = await client.get(`/member/${id}/alarm`);

  return response;
};

export const updateAlarm = async ({ no }) => {
  const response = await client.put(`/alarm/${no}`);

  return response;
};

export const deleteAlarm = async ({ no }) => {
  const response = await client.delete(`/alarm/${no}`);

  return response;
};
