import { getDatabase, ref, set, onValue, push, remove, query, limitToFirst, get, orderByKey, startAfter, orderByChild, equalTo } from "firebase/database"

const firebaseDatabase = getDatabase()

const setVal = (path: string, data: any) => {
  set(ref(firebaseDatabase, path), data)
}

const getVal = (path: string, limit?: number, startAfterValue?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const nodePath = ref(firebaseDatabase, path);
    let firebaseQuery;

    // For films, we'll get all data first and sort in memory for consistency
    if (path === "listOfSeenfilms") {
      firebaseQuery = nodePath;
    } else {
      // For other paths, use the original key-based ordering
      if (limit !== undefined) {
        if (startAfterValue !== undefined) {
          firebaseQuery = query(nodePath, orderByKey(), startAfter(startAfterValue), limitToFirst(limit));
        } else {
          firebaseQuery = query(nodePath, orderByKey(), limitToFirst(limit));
        }
      } else {
        firebaseQuery = nodePath; 
      }
    }

    get(firebaseQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // If it's films data, convert to array and sort by date in descending order (newest first)
        if (path === "listOfSeenfilms" && data) {
          const filmsArray = Object.values(data);
          filmsArray.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          
          // Apply pagination to the sorted array
          if (limit !== undefined) {
            const startIndex = startAfterValue ? parseInt(startAfterValue) : 0;
            const endIndex = startIndex + limit;
            resolve(filmsArray.slice(startIndex, endIndex));
          } else {
            resolve(filmsArray);
          }
        } else {
          resolve(data);
        }
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
  return new Promise((resolve, reject) => {
    const nodePath = ref(firebaseDatabase, path)
    remove(nodePath)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

const getValWithSearchTerm = (path: string, searchTerm: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const nodePath = ref(firebaseDatabase, path);

    get(nodePath).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const searchWords = searchTerm.toLowerCase().split(' ');

        const filteredData = Object.keys(data).filter(key => {
          const item = data[key];
          return Object.values(item).some(value => {
            const valueString = value ? value.toString().toLowerCase() : '';
            return searchWords.every(word => valueString.includes(word));
          });
        }).reduce((result: any, key) => {
          result[key] = data[key];
          return result;
        }, {});

        resolve(filteredData);
      } else {
        resolve(null);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};


export { setVal, getVal, pushVal, getValLive, deleteVal, getValWithSearchTerm }
