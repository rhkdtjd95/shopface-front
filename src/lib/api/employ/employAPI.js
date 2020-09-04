import client from '../client';

export const getEmployList = async ({ selectedBranch }) => {
  const response = await client.get(`/branch/${selectedBranch}/employ`);
  return response;
};

export const postEmploy = ({ post }) => {
  const response = client.post('/employ', post);
  return response;
};

export const getEmploy = async ({ no }) => {
  const response = await client.get(`/employ/${no}`);
  return response;
};

export const updateEmploy = async ({ no, data }) => {
  const response = await client.put(`/employ/${no}`, data);
  return response;
};

export const disableEmploy = async ({ no }) => {
  const response = await client.patch(`employ/${no}`);
  return response;
};

export const inviteEmploy = async ({ no }) => {
  const response = await client.put(`/employ/${no}/invite`);
  return response;
};
