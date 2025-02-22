import { API_AUTH } from '@/constants/API';
import instance from '@/api/instance';

/**
 * 로그인
 */
const postLogin = ({ email, password }) => {
  return instance({
    url: API_AUTH.LOGIN,
    method: 'POST',
    data: {
      email,
      password,
    },
  });
};

/**
 * 비밀번호 변경
 */
const putPasswordChange = ({ password, newPassword }) => {
  return instance({
    url: API_AUTH.PASSWORD_CHANGE,
    method: 'PUT',
    data: {
      password,
      newPassword,
    },
  });
};

export default { postLogin, putPasswordChange };
