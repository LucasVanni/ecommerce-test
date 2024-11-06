import { z } from "zod";

const UserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export { UserDTO };
