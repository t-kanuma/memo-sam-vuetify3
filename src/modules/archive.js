import { useRouter } from "vue-router";
const router = useRouter();

export const getArchives = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/archives`,
    {
      method: "GET",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    router.push("/login");
  } else {
    // エラー画面に遷移
    throw new Error(response.statusText);
  }
};

export const deleteArchive = async (archiveId) => {
  const response = await fetch(
    `${process.env.VUE_APP_API_BASE_URL}/archives/${archiveId}`,
    {
      cache: "no-cache",
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    router.push("/login");
  } else {
    // エラー画面に遷移
    throw new Error(response.statusText);
  }
};

export const postArchive = async () => {
  // todo
};
