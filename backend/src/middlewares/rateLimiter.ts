import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
});


export {rateLimiter}