import { getDatabase, ref, set, onValue, push, remove, query, limitToFirst, get, orderByKey, startAfter } from "firebase/database"

const firebaseDatabase = getDatabase()

const setVal = (path: string, data: any) => {
  set(ref(firebaseDatabase, path), data)
}

const getVal = (path: string, limit?: number, startAfterValue?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const nodePath = ref(firebaseDatabase, path);
    let firebaseQuery;

    if (limit !== undefined) {
      if (startAfterValue !== undefined) {
        firebaseQuery = query(nodePath, orderByKey(), startAfter(startAfterValue), limitToFirst(limit));
      } else {
        firebaseQuery = query(nodePath, orderByKey(), limitToFirst(limit));
      }
    } else {
      firebaseQuery = nodePath; 
    }

    get(firebaseQuery).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        resolve(null); 
      }
    }).catch((error) => {
      reject(error); 
    });
  });
};

const getValLive = (path: string, callback: (data: any) => void) => {
  const nodePath = ref(firebaseDatabase, path);

  // Listen for changes in the database
  const unsubscribe = onValue(nodePath, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

  // Return the unsubscribe function to stop listening when needed
  return unsubscribe;
};

const pushVal = (path: string, data: any) => {
  const dataListRef = ref(firebaseDatabase, path)
  const newPostRef = push(dataListRef)
  set(newPostRef, {
    ...data
  })
}

const deleteVal = (path: string): Promise<void> => {
  console.log(path);
  return new Promise((resolve, reject) => {
    const nodePath = ref(firebaseDatabase, path)
    remove(nodePath)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

export { setVal, getVal, pushVal, getValLive, deleteVal }