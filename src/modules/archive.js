import { getIdToken } from "@/modules/auth";
import { handleFetchResponse } from "@/modules/common";

/**
 *
 * @returns
 */
export const getArchives = async () => {
  const idToken = await getIdToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/archives`,
    {
      method: "GET",
      cache: "no-store",
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
 * @param {*} archiveId
 */
export const deleteArchive = async (archiveId) => {
  const idToken = await getIdToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/archives/${archiveId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  return await handleFetchResponse(response);
};
