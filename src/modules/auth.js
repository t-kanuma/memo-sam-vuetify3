export default {
  // _getCookie: (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // },
  async isloggedIn() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/status`,
        {
          cache: "no-cache",
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
  },
};
