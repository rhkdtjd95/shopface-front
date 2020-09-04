import client from '../client';

export const getBranchList = async ({ name }) => {
  const response = await client.get(`/member/${name}/branch`);
  return response;
};

export const getAdminBranchList = async () => {
  const response = await client.get('/branch');
  return response;
};

export const postBranch = async ({ post }) => {
  const response = await client.post('/branch', post);
  return response;
};

export const getBranch = async ({ no }) => {
  const response = await client.get(`/branch/${no}`);
  return response;
};

export const putBranch = async ({ no, data }) => {
  const response = await client.put(`/branch/${no}`, data);
  return response;
};

export const deleteBranch = async ({ no }) => {
  const response = await client.delete(`/branch/${no}`);
  return response;
};

export const confirmBranch = async ({ no }) => {
  const response = await client.patch(`/branch/${no}/confirm`);
  return response;
};

export const rejectBranch = async ({ no }) => {
  const response = await client.patch(`/branch/${no}/reject`);
  return response;
};
