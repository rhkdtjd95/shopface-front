import client from '../client';

export const getEmployRecordList = async ({ id }) => {
  const response = await client.get(`/member/${id}/record`);
  return response;
};

export const getBusinessRecordList = async ({ selectedBranch }) => {
  const response = await client.get(`/branch/${selectedBranch}/record`);
  return response;
};
export const postRecord = ({ post }) => {
  const response = client.post('/record', post);
  return response;
};
