export const getMemos = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/memos`, {
    cache: "no-cache",
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    this.$router.push("/login");
  } else {
    // エラー画面に遷移
    throw new Error(response.statusText);
  }
};

export const updateMemo = async (memo) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/memos/${memo.id}`,
    {
      cache: "no-cache",
      method: "PUT",
      body: JSON.stringify(memo),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    console.log(await response.json());
  } else if (response.status === 401) {
    this.$router.push("/login");
  } else {
    throw new Error();
  }
};

export const postMemo = async () => {
  // todo
};
