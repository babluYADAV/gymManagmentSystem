export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token"); // or cookie check
};
