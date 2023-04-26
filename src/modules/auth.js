import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

/**
 *
 */
const userPool = new CognitoUserPool({
  UserPoolId: `${import.meta.env.VITE_COGNITO_USER_POOL_ID}`,
  ClientId: `${import.meta.env.VITE_COGNITO_CLIENT_ID}`,
});

/**
 *
 */
export class NoUserSessionError extends Error {
  constructor(message = "No user session") {
    super(message);
  }
}

/**
 *
 * @returns
 */
export const getUserSession = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) {
    return null;
  }

  return new Promise((resolve, reject) => {
    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
      }

      resolve(session);
    });
  });
};

/**
 *
 * @returns
 */
export const getIdToken = async () => {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      // 想定ケース
      //   - 未ログインでURL直打ちの場合
      throw new NoUserSessionError();
    } else {
      return userSession.getIdToken().getJwtToken();
    }
  } catch {
    // 想定ケース: リフレッシュトークンが期限切れの場合
    throw new NoUserSessionError();
  }
};

let cognitoUser = null;
/**
 *
 * @param {*} userName
 * @param {*} password
 * @returns
 */
export const authenticate = async (userName, password) => {
  if (!userName || !password) {
    throw new Error("loginId or password is empty");
  }

  const user = { Username: userName, Pool: userPool };
  cognitoUser = new CognitoUser(user);

  const authenticationData = { Username: userName, Password: password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) => {
    // この中で勝手にid/access/refreshをlocalStorageに保管してくれる。
    // TODO Cookieに入れること。
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
      newPasswordRequired: resolve,
    });
  });
};

// TODO これはいずれ消される。
/**
 *
 * @param {*} userName
 * @param {*} newPassword
 * @returns
 */
export const completeNewPasswordChallenge = async (userName, newPassword) => {
  if (!userName || !newPassword) {
    throw new Error("loginId or NewPassword is empty");
  }

  return new Promise((resolve, reject) => {
    cognitoUser.completeNewPasswordChallenge(newPassword, null, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

/**
 *
 * @returns
 */
export const logout = async () => {
  const cognitoUser = userPool.getCurrentUser();
  return new Promise((resolve) => {
    cognitoUser.signOut(resolve());
  });
};

/**
 *
 * @returns
 */
export const isloginSessionValid = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) {
    return false;
  }

  cognitoUser.getSession().then((session) => {
    console.log(session);
    return session.isValid();
  });
};
