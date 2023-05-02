import type { MemoArchiveResp } from "@/types";

/**
 *
 * @param {*} response
 * @returns
 */
export const handleFetchResponse = async (
  response: Response
): Promise<unknown> => {
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

export const isMemoArchiveResp = (value: unknown): value is MemoArchiveResp => {
  return typeof value === "object" && value !== null && "memos" in value;
};

// export const isMemo = (value: unknown): value is Memo => {
//   return (
//     typeof value === "object" &&
//     value !== null &&
//     "id" in value &&
//     "title" in value &&
//     "text" in value &&
//     "favorite" in value &&
//     "archived" in value &&
//     "done" in value
//   );
// };
