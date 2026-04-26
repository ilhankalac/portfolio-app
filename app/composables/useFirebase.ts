import { ref as dbRef, set, onValue, push, remove, query, limitToFirst, get, orderByKey, startAfter } from 'firebase/database'

export function useFirebase() {
  const getDb = () => useNuxtApp().$firebaseDatabase

  const setVal = (path: string, data: any) => {
    set(dbRef(getDb(), path), data)
  }

  const getVal = (path: string, limit?: number, startAfterValue?: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const db = getDb()
      const nodePath = dbRef(db, path)
      let firebaseQuery

      if (path === 'listOfSeenfilms') {
        firebaseQuery = nodePath
      } else {
        if (limit !== undefined) {
          if (startAfterValue !== undefined) {
            firebaseQuery = query(nodePath, orderByKey(), startAfter(startAfterValue), limitToFirst(limit))
          } else {
            firebaseQuery = query(nodePath, orderByKey(), limitToFirst(limit))
          }
        } else {
          firebaseQuery = nodePath
        }
      }

      get(firebaseQuery).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()

          if (path === 'listOfSeenfilms' && data) {
            const filmsArray = Object.values(data)
            filmsArray.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

            if (limit !== undefined) {
              const startIndex = startAfterValue ? parseInt(startAfterValue) : 0
              const endIndex = startIndex + limit
              resolve(filmsArray.slice(startIndex, endIndex))
            } else {
              resolve(filmsArray)
            }
          } else {
            resolve(data)
          }
        } else {
          resolve(null)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  const getValLive = (path: string, callback: (data: any) => void, onError?: (error: Error) => void) => {
    const db = getDb()
    const nodePath = dbRef(db, path)
    const unsubscribe = onValue(nodePath, (snapshot) => {
      const data = snapshot.val()
      callback(data)
    }, (error) => {
      onError?.(error)
    })
    return unsubscribe
  }

  const pushVal = (path: string, data: any) => {
    const db = getDb()
    const dataListRef = dbRef(db, path)
    const newPostRef = push(dataListRef)
    set(newPostRef, { ...data })
  }

  const deleteVal = (path: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const db = getDb()
      const nodePath = dbRef(db, path)
      remove(nodePath)
        .then(() => resolve())
        .catch((error) => reject(error))
    })
  }

  const getValWithSearchTerm = (path: string, searchTerm: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const db = getDb()
      const nodePath = dbRef(db, path)

      get(nodePath).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const searchWords = searchTerm.toLowerCase().split(' ')

          const filteredData = Object.keys(data).filter(key => {
            const item = data[key]
            return Object.values(item).some(value => {
              const valueString = value ? value.toString().toLowerCase() : ''
              return searchWords.every(word => valueString.includes(word))
            })
          }).reduce((result: any, key) => {
            result[key] = data[key]
            return result
          }, {})

          resolve(filteredData)
        } else {
          resolve(null)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  return {
    setVal,
    getVal,
    pushVal,
    getValLive,
    deleteVal,
    getValWithSearchTerm,
  }
}
