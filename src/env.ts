import { z, TypeOf } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const EnvSchema = z.object({
  DB_URL: z
    .string({
      description: "DB Connection string",
      required_error: "😱 You forgot to add a database URL",
    })
    .url()
    .min(3),
  REDIS_URL: z
    .string({
      description: "Redis Connection string",
      required_error: "😱 You forgot to add a redis URL",
    })
    .url()
    .min(3)
    .optional(),
  NODE_ENV: z
    .enum(["development", "test", "production"], {
      description: "This gets updated depending on your environment",
    })
    .default("development"),
  PORT: z.coerce
    .number({
      description:
        ".env files convert numbers to strings, therefore we have to enforce them to be numbers",
    })
    .positive()
    .max(65536, `options.port should be >= 0 and < 65536`)
    .default(3000),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof EnvSchema> {}
  }
}

try {
  EnvSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(", ")}` : field,
      )
      .join("\n  ");
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
    process.exit(1);
  }
}
