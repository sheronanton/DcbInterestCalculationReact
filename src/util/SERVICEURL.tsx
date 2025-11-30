// src/util/SERVICEURL.ts

// 1 = development, 2 = production
const mode: 1 | 2 = import.meta.env.DEV ? 1 : 2;

const BASE_URL =
  mode === 1
    ? "http://localhost:8080/intCalc/" // dev: backend on 8080
    : "/intCalc/"; // prod: same origin /intCalc/

const SERVICEURL = {
  mode,
  BASE_URL,
};

export default SERVICEURL;

export type ServiceUrlConfig = typeof SERVICEURL;
// Download as Excel
