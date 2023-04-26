import { getIdToken } from "@/modules/auth";
import { handleFetchResponse } from "@/modules/common";

/**
 *
 * @returns
 */
export const getMemos = async () => {
  const idToken = await getIdToken();
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/memos`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  return await handleFetchResponse(response);
};

/**
 *
 * @param {*} memo
 * @returns
 */
export const updateMemo = async (memo) => {
  const idToken = await getIdToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/memos/${memo.id}`,
    {
      method: "PUT",
      body: JSON.stringify(memo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  return await handleFetchResponse(response);
};

/**
 *
 * @param {*} newMemo
 * @returns
 */
export const postMemo = async (newMemo) => {
  const idToken = await getIdToken();
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/memos`, {
    method: "POST",
    body: JSON.stringify(newMemo),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  return await handleFetchResponse(response);
};
