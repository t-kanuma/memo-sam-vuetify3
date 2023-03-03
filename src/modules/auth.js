import { useRouter } from "vue-router";
const router = useRouter();

export const login = async (loginId, password) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loginId,
        password: password,
      }),
    }
  );
  if (response.ok) {
    router.push("/");
  } else {
    throw new Error(`login resulted in ${response.status}`);
  }
};

// todo userIdの追加
export const logout = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    router.push("/");
  } else {
    throw new Error(`logout resulted in ${response.status}`);
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/status`,
      {
        cache: "no-store",
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
