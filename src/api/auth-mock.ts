const db = window.localStorage;
const dbName = 'users';
const signedDbName = 'signed';

export function signUp<T>(user: any): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      const isEmailDupl = isDuplicate(user);
      console.log(isEmailDupl);

      if (isEmailDupl) {
        throw new Error('User with this email already exists');
      } else {
        addUser(user);
        delete user.password;
        addUserToSigned(user);
        resolve(user);
      }
    } catch (err) {
      console.log(err);

      reject(err);
    }
  });
}

export function signIn<T>({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      const user = getUser(email);
      if (!user) {
        throw new Error('User not found');
      } else if (user.password === password) {
        delete user.password;
        addUserToSigned(user);
        resolve(user);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function reAuth<T>(): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      const signedUser = JSON.parse(db.getItem(signedDbName) || 'false');
      if (signedUser) {
        delete signedUser.password;
        resolve(signedUser);
      } else {
        throw new Error('Session Expired');
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    try {
      removeUserFromSigned();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function removeUserFromSigned() {
  const signed = JSON.parse(db.getItem(signedDbName) || 'false');
  if (signed) {
    db.removeItem(signedDbName);
  }
}

function addUserToSigned(user: any) {
  const signed = JSON.parse(db.getItem(signedDbName) || 'false');
  if (signed) {
    db.removeItem(signedDbName);
  }
  db.setItem(signedDbName, JSON.stringify(user));
}

function addUser(user: any) {
  const users = JSON.parse(db.getItem(dbName) || '[]');

  const isDbExist = Array.isArray(users) && users.length > 0;

  if (!isDbExist) {
    db.setItem(dbName, JSON.stringify([user]));
  } else {
    users.push(user);
    db.setItem(dbName, JSON.stringify(users));
  }
}

function isDuplicate(user: any) {
  const duplicateUser = getUser(user.email);

  if (duplicateUser) {
    return true;
  }

  return false;
}

function getUser(email: string) {
  const users = JSON.parse(db.getItem('users') || '[]');

  if (Array.isArray(users) && users.length > 0) {
    return users.find((user: any) => user.email === email);
  }

  return false;
}
