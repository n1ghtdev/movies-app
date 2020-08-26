/* eslint-disable eqeqeq */
const db = window.localStorage;
const dbName = 'favorites';

export function addFavoriteMovie(movieId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const isMovieInFavorites = isDuplicate(movieId);

      if (isMovieInFavorites) {
        throw new Error('This movie already in favorites list');
      } else {
        addItem(movieId);
        resolve(movieId);
      }
    } catch (err) {
      console.log(err);

      reject(err);
    }
  });
}

export function getFavoriteMovies(): Promise<number[]> {
  return new Promise((resolve, reject) => {
    try {
      const ids = getList();
      resolve(ids);
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteFavoriteMovie(id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      deleteItem(id);
      resolve(Number(id));
    } catch (err) {
      reject(err);
    }
  });
}

function deleteItem(movieId: number) {
  const favorites = JSON.parse(db.getItem(dbName) || '[]');
  const favoriteIdx = favorites.findIndex(
    (id: string | number) => id == movieId
  );
  const newFavorites = [
    ...favorites.slice(0, favoriteIdx),
    ...favorites.slice(favoriteIdx + 1),
  ];
  db.setItem(dbName, JSON.stringify(newFavorites));
}

function addItem(movieId: number) {
  const favorites = JSON.parse(db.getItem(dbName) || '[]');
  const isDbExist = Array.isArray(favorites) && favorites.length > 0;

  if (!isDbExist) {
    db.setItem(dbName, JSON.stringify([movieId]));
  } else {
    favorites.push(movieId);
    db.setItem(dbName, JSON.stringify(favorites));
  }
}

function isDuplicate(movieId: number) {
  const duplicate = getMovie(movieId);
  console.log(duplicate);

  if (duplicate) {
    return true;
  }

  return false;
}

function getMovie(movieId: number) {
  const favorites = JSON.parse(db.getItem(dbName) || '[]');

  if (Array.isArray(favorites) && favorites.length > 0) {
    return favorites.find((id: string | number) => id == movieId);
  }
}

function getList() {
  const favorites = JSON.parse(db.getItem(dbName) || '[]');

  if (Array.isArray(favorites) && favorites.length > 0) {
    return favorites;
  }

  return [];
}
