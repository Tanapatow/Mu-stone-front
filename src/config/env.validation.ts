import z from "zod";
console.log("RUN:", typeof window);
const serverEnvSchema = z.object({
  BACKEND_URL: z.string().url(),
});

const serverResult = serverEnvSchema.safeParse(process.env);
if (!serverResult.success) {
  console.error(
    "Invalid server enviroment variables: \n",
    z.prettifyError(serverResult.error),
  );
  process.exit(1);
}

export const serverEnv = serverResult.data;
