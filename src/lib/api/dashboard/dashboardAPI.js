import client from '../client';

export const getEmployWDashboard = async ({ id, state }) => {
  const response = await client.get(`/employee/${id}/${state}`);
  return response;
};

export const getEmployRDashboard = async ({ id, state }) => {
  const response = await client.get(`/employee/${id}/${state}`);
  return response;
};

export const getEmployCDashboard = async ({ id, state }) => {
  const response = await client.get(`/employee/${id}/${state}`);
  return response;
};

// export cont getEmployADashboard = async({id,state}) => {
//   const response = await client.get(`/employee/${id}/${state}`);
//   return response;
// }

export const getBusinessWDashboard = async ({ id, selectedBranch, state }) => {
  const response = await client.get(
    `/businessman/${id}/branch/${selectedBranch}/${state}`,
  );
  return response;
};

export const getBusinessRDashboard = async ({ id, selectedBranch, state }) => {
  const response = await client.get(
    `/businessman/${id}/branch/${selectedBranch}/${state}`,
  );
  return response;
};

export const getBusinessCDashboard = async ({ id, selectedBranch, state }) => {
  const response = await client.get(
    `/businessman/${id}/branch/${selectedBranch}/${state}`,
  );
  return response;
};

export const putWorkTime = async ({ no }) => {
  const response = await client.put(`/schedule/${no}/working`);
  return response;
};

export const putQuitTime = async ({ no }) => {
  const response = await client.put(`/schedule/${no}/quitting`);
  return response;
};
