import { executeQuery } from "@/config/db";

const GetUser = async (req, res) => {
  let personsData = await executeQuery("select * from user", []);
  res.send(personsData);
};

export { GetUser };
