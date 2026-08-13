import { getItem } from "./locales";
import { getServerSideConfig } from "@/app/config/server";

function getUserHost() {
  const serverConfig = getServerSideConfig();
  if (!serverConfig.reqUrl) {
    throw new Error("[Request] REQ_URL is not configured");
  }

  return serverConfig.reqUrl;
}

export async function accountReLogin(
  inputAccountValue: string,
  inputPasswordValue: string,
) {
  const formData = new FormData();
  formData.append("account", inputAccountValue);
  formData.append("password", inputPasswordValue);

  return fetch(`${getUserHost()}/api/account-relogin`, {
    method: "POST",
    body: formData,
  });
}

export async function userInfo() {
  const formData = new FormData();

  var userKey = getItem("USER_KEY");
  if (!userKey) {
    userKey = "";
  }
  formData.append("token", userKey);

  return fetch(`${getUserHost()}/api/user-info`, {
    method: "POST",
    body: formData,
  });
}

export async function send(content: string) {
  const formData = new FormData();

  var userKey = getItem("USER_KEY");
  if (!userKey) {
    userKey = "";
  }
  formData.append("token", userKey);

  formData.append("message", content);

  return fetch(`${getUserHost()}/api/send`, {
    method: "POST",
    body: formData,
  });
}
