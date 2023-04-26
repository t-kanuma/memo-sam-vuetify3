/**
 *
 * @param {*} response
 * @returns
 */
export const handleFetchResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    // idTokenが不正な場合
    throw new InvaidTokenError();
  } else {
    // エラー画面に遷移
    throw new Error(response.statusText);
  }
};

class InvaidTokenError extends Error {
  constructor(message = "Invalid token") {
    super(message);
  }
}
