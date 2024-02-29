import jwt from "jsonwebtoken";
import { SECRET } from "../../constants/secret.jwt";
import { GraphQLError } from "graphql";

export const verifyToken = (token: string) => {
  try {
    if (token) {
      const user: any = jwt.verify(token, SECRET);
      return user;
    }
    throw new Error("unable to verify token");
  } catch (error: any) {
    throw new Error(error);
  }
};

export default async ({ req, _res }: any) => {
  if (req.body.operationName === "IntrospectionQuery") {
    return {};
  }
  const token = req.headers.authorization || "";
  const user = await verifyToken(token);
  if (!user) {
    throw new GraphQLError("User is not Authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
  return { user };
};
