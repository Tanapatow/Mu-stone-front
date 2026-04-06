import { redirect } from "next/navigation";
import { auth } from "./auth";
import z from "zod";

const currentUserschema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  accessToken: z.string(),
  avatarUrl: z.string().nullable(),
});

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const { success, data, error } = currentUserschema.safeParse(session.user);
  if (!success) {
    redirect("/login");
  }

  return data;
};
