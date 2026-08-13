import md5 from "spark-md5";
import { logInfo } from "@/app/utils/logger";

function normalizeUrl(value?: string) {
  if (!value) return "";
  return value.trim().replace(/\/+$/, "");
}

function validateUrl(value: string, name: string) {
  if (!value) return "";
  try {
    return new URL(value).toString().replace(/\/+$/, "");
  } catch {
    throw new Error(`[Server Config] invalid ${name}: ${value}`);
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY?: string;
      CODE?: string;
      BASE_URL?: string;
      PROXY_URL?: string;
      REQ_URL?: string;
      VERCEL?: string;
      HIDE_USER_API_KEY?: string; // disable user's api key input
      DISABLE_GPT4?: string; // allow user to use gpt-4 or not
    }
  }
}

const ACCESS_CODES = (function getAccessCodes(): Set<string> {
  const code = process.env.CODE;

  try {
    const codes = (code?.split(",") ?? [])
      .filter((v) => !!v)
      .map((v) => md5.hash(v.trim()));
    return new Set(codes);
  } catch (e) {
    return new Set();
  }
})();

export const getServerSideConfig = () => {
  if (typeof process === "undefined") {
    throw Error(
      "[Server Config] you are importing a nodejs-only module outside of nodejs",
    );
  }

  logInfo("[Server Config]", "loaded", {
    hasApiKey: !!process.env.OPENAI_API_KEY,
    hasCode: !!process.env.CODE,
    hasBaseUrl: !!process.env.BASE_URL,
    hasProxyUrl: !!process.env.PROXY_URL,
    hasReqUrl: !!process.env.REQ_URL,
    hasOrgId: !!process.env.OPENAI_ORG_ID,
    isVercel: !!process.env.VERCEL,
  });

  return {
    apiKey: process.env.OPENAI_API_KEY,
    code: process.env.CODE,
    codes: ACCESS_CODES,
    needCode: ACCESS_CODES.size > 0,
    baseUrl: validateUrl(normalizeUrl(process.env.BASE_URL), "BASE_URL"),
    proxyUrl: validateUrl(normalizeUrl(process.env.PROXY_URL), "PROXY_URL"),
    reqUrl: validateUrl(normalizeUrl(process.env.REQ_URL), "REQ_URL"),
    isVercel: !!process.env.VERCEL,
    hideUserApiKey: !!process.env.HIDE_USER_API_KEY,
    enableGPT4: !process.env.DISABLE_GPT4,
  };
};
