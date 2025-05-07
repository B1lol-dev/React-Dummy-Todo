export const useAuth = () => {
  const isAuthenticated = () => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  };

  const isAdmin = () => {
    return localStorage.getItem("adminToken") !== null || "" || undefined;
  };

  const user = JSON.parse(localStorage.getItem("user")!);

  const logout = () => {
    localStorage.clear();
  };

  return { isAuthenticated, isAdmin, user, logout };
};
