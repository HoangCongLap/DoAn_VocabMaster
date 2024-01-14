import { Stack } from "@chakra-ui/react";
import UserProfile from "../UserProfile/UserProfile";

const AccountSettings = () => {
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <Stack style={{ width: "100%", marginTop: "30px" }}>
        <UserProfile />
      </Stack>
    </div>
  );
};
export default AccountSettings;
