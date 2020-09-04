import client from '../client';

export const getMemberList = async () => {
  const response = await client.get('/member');
  return response;
};
export const getMember = async ({ id }) => {
  const response = await client.get(`/member/${id}`);
  return response;
};

export const postMember = ({ data }) => {
  const response = client.post('/member', { data });
  return response;
};

export const putMember = async ({ id, data }) => {
  const response = await client.put(`/member/${id}`, data);
  return response;
};

export const deleteMember = async ({ id }) => {
  const response = await client.delete(`/member/${id}`);
  return response;
};
