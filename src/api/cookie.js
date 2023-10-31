export const getTokenCookie = () => {
  const value = document.cookie.match("(^|;) ?" + "token" + "=([^;]*)(;|$)");

  return value ? value[2] : undefined;
};

export const setTokenCookie = (min) => {
  const date = new Date();
  console.log(date);
  date.setTime(date.getTime() + min * 60 * 60 * 1000);
  console.log(date);
  document.cookie = `token=expiration;expires=${date.toUTCString()};path=/`;
};

export const deleteTokenCookie = function () {
  document.cookie = "token" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
