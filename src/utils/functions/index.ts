import axios from "axios";
import jwt_decode from "jwt-decode";

export const createOrGetUser = async (res: any) => {
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    res.credential
  );
  const { name, picture, sub } = decoded;

  return decoded;
};
