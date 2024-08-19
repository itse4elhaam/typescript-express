import type { RedisOptions } from "ioredis";
import Redis from "ioredis";

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  host: "redis",
};

const redisClient = new Redis(process.env.REDIS_URL || "", redisOptions);

export default redisClient;
