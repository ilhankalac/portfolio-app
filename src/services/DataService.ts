import { getDatabase, ref, set } from "firebase/database";

const firebaseDatabase = getDatabase();

const write = (path: string, data: any) => {
  set(ref(firebaseDatabase, path), data);
}

export { write };