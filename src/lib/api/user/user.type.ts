export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  role: "USER" | "ADMIN";
  isActive: boolean;
};

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
};
