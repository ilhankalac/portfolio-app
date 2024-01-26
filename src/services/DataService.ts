import { getDatabase, ref, set, onValue, push } from "firebase/database";

const firebaseDatabase = getDatabase();

const setVal = (path: string, data: any) => {
  set(ref(firebaseDatabase, path), data);
}

const getVal = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const nodePath = ref(firebaseDatabase, path);

    onValue(nodePath, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, {
      onlyOnce: true // Ensure the callback is executed only once
    });
  });
};

const pushVal = (path: string, data: any) => {
  const dataListRef = ref(firebaseDatabase, path);
  const newPostRef = push(dataListRef);
  set(newPostRef, {
    ...data
  });
}

export { setVal, getVal, pushVal };