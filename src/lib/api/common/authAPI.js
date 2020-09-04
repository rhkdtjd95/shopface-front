import { Auth } from '@aws-amplify/auth';
import client from '../client';

export const login = async ({ id, password }) => {
  try {
    const user = await Auth.signIn(id, password);
    const name = user.signInUserSession.idToken.payload.email;
    const jwt = user.signInUserSession.idToken.jwtToken;

    const response = await client.get(`/member/${name}`);
    const type = response.data.data.type;

    localStorage.setItem('user', JSON.stringify({ name, jwt, type }));

    return { data: { user: { name, jwt, type } } };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  await Auth.signOut({ global: true }).catch(() => {
    throw new Error();
  });
  try {
    localStorage.removeItem('user');
    return { message: 'Success' };
  } catch (error) {
    throw new Error('로그아웃 실패');
  }
};

export const signUp = async ({ member, certCode }) => {
  const response = await Auth.signUp({
    username: member.id,
    password: member.password,
    attributes: {
      name: member.name,
      phone_number: `+82${member.phone}`,
    },
  })
    .then(async () => {
      const response = await client
        .post('/member', {
          id: member.id,
          password: member.password,
          name: member.name,
          phone: member.phone,
          email: member.email,
          certCode: certCode,
        })
        .then(async (resolve) => {
          if (certCode !== null && certCode !== '') {
            return await client.patch('/employ', {
              memberId: member.id,
              certCode: certCode,
            });
          }
          return resolve;
        });

      return response;
    })
    .catch((e) => {
      throw new Error(e.code);
    });

  return response;
};

export const sendForgotPasswordCode = async ({ name }) => {
  const response = await Auth.forgotPassword(name)
    .then(() => {
      return { data: { code: 'OK' } };
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

export const changeForgotPassword = async ({ data }) => {
  const response = await Auth.forgotPasswordSubmit(
    data.name,
    data.code,
    data.changePassword,
  )
    .then((data) => {
      return { data: { code: 'OK' } };
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

export const changePassword = async ({ data }) => {
  const response = await Auth.currentAuthenticatedUser()
    .then((user) => {
      return Auth.changePassword(user, data.originPassword, data.newPassword);
    })
    .then((data) => {
      return { data: { code: 'OK' } };
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

export const checkExpire = async () => {
  let isExpired = false;
  await Auth.currentSession()
    .then((session) => {
      const accessTokenExpire = session.getAccessToken().getExpiration() - 100;
      const currentTimeSeconds = Math.round(Date.now() / 1000);
      if (accessTokenExpire < currentTimeSeconds) {
        return (isExpired = true);
      }
    })
    .catch((e) => {
      console.log(' 세션이 존재하지 않습니다. ');
      return isExpired;
    });
  return isExpired;
};

export const patchEmployByCertCode = async ({ memberId, certCode }) => {
  const response = await client.patch('/employ', {
    memberId,
    certCode,
  });
  return response;
};

export const checkCertCode = async ({ certCode }) => {
  const response = await client.get(`/employ/check?certcode=${certCode}`);
  return response;
};
