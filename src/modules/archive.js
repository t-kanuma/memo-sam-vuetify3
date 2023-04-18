import { useRouter } from "vue-router";

export const getArchives = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/archives`,
    {
      method: "GET",
      cache: "no-store",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return (await response.json()).memos;
  } else if (response.status === 401) {
    // TODO ここのコード本当にいるかな？
    const router = useRouter();
    router.push("/login");
  } else {
    // エラー画面に遷移
    throw new Error(response.statusText);
  }
};

export const deleteArchive = async (archiveId) => {
  console.log(archiveId);
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/archives/${archiveId}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      // TODO ここのコード本当にいるかな？
      const router = useRouter();
      router.push("/login");
    } else {
      // エラー画面に遷移
      throw new Error(response.statusText);
    }
  }
};
