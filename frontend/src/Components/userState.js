import { useState } from "react";

export const useUserState = () => {
  const [user, setUser] = useState({});
  return [user, setUser];
};
