import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => { // ✅ Use `ctx` instead of `convexToJson`
    // Check if user already exists in the "users" table
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length == 0) {
      // If user does not exist, insert new user
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 5000,
      };
      const result = await ctx.db.insert("users", data);
      return data;
    }
    return user[0]; // Return existing user
  },
});


