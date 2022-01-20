import local from "./local.json";

const addresses = process.env.NODE_ENV === "development" ? local : local;

export default addresses;
