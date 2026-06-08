const rawUserData: User = {
  id: "e3b0c442",
  username: "intern_01",
  email: "intern@example.com",
  isActive: true,
  personalInfo: {
    firstName: "Ivan",
    lastName: "Ivanov",
    age: 22,
    phone: null,
  },
  roles: ["user", "editor"],
  lastLogin: "2023-10-25T12:00:00Z",
};

type UserRole = "user" | "editor";
interface UserPersonalInfo {
  firstName: string;
  lastName: string;
  age: number;
  phone: null | string; // Can be null or a string — the field is always present
}

type UserID = string;
interface UserCredentials {
  username: string;
  email: string;
}

interface User extends UserCredentials {
  id: UserID;
  isActive: boolean;
  personalInfo: UserPersonalInfo;
  roles: UserRole[];
  lastLogin?: string; // NOTE: may be absent for users who have never logged in
}

// ---- TEST -------

// CORRECT
// Both of these should compile without errors:
const activeUser: User = {
  id: "e3b0c442",
  username: "intern_01",
  email: "intern@example.com",
  isActive: true,
  personalInfo: { firstName: "Ivan", lastName: "Ivanov", age: 22, phone: null },
  roles: ["user", "editor"],
  lastLogin: "2023-10-25T12:00:00Z",
};

const newUser: User = {
  id: "abc123",
  username: "new_user",
  email: "new@example.com",
  isActive: false,
  personalInfo: {
    firstName: "Jane",
    lastName: "Doe",
    age: 20,
    phone: "+447700900000",
  },
  roles: ["user"],
  // lastLogin is intentionally absent — valid for a user who has never logged in
};

// INCORRECT

const activeUserUndefinedPhone: User = {
  id: "e3b0c442",
  username: "intern_01",
  email: "intern@example.com",
  isActive: true,
  personalInfo: {
    firstName: "Ivan",
    lastName: "Ivanov",
    age: 22,
    phone: undefined,
  },
  roles: ["user", "editor"],
  lastLogin: "2023-10-25T12:00:00Z",
};

const incorrectRoles: User = {
  id: "abc123",
  username: "new_user",
  email: "new@example.com",
  isActive: false,
  personalInfo: {
    firstName: "Jane",
    lastName: "Doe",
    age: 20,
    phone: "+447700900000",
  },
  roles: ["user", "superadmin"],
  // lastLogin is intentionally absent — valid for a user who has never logged in
};
