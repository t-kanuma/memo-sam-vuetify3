import { NoUserSessionError } from "@/modules/auth";

/**
 *
 * @param {*} response
 * @returns
 */
export const handleFetchResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    // 想定ケース: 上記でidToken取れたが、サーバー側で認証エラーになった場合
    //   - idTokenが不正な場合
    //   - idTokenが期限切れの場合(上記で正常取得してAPIコールまでに期限切れになったレアケース)
    throw new NoUserSessionError();
  } else {
    // エラー画面に遷移
    throw new Error(response.statusText);
  }
};
