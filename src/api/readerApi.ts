import Friday from "../utils/Friday";

const READER_BASE_URL = import.meta.env.VITE_READER_BASE_URL;

export async function getReader() {
  return await Friday.get(new URL(`${READER_BASE_URL}/`));
}
