import { getDatabase, ref, set, onValue, push } from "firebase/database";

const firebaseDatabase = getDatabase();

const setVal = (path: string, data: any) => {
  set(ref(firebaseDatabase, path), data);
}

const getVal = (path: string) => { 
  const nodePath = ref(firebaseDatabase, path);
  let value = null;

  onValue(nodePath, (snapshot) => {
    const data = snapshot.val();
    value = data;
  });

  return value;
}

const pushVal = (path: string, data: any) => {
  const dataListRef = ref(firebaseDatabase, path);
  const newPostRef = push(dataListRef);
  set(newPostRef, {
    ...data
  });
}

export { setVal, getVal, pushVal };