import { StyleSheet, Image } from "react-native";
import { SecondaryText, Text, View, useThemeColor } from "@/components/Themed";

import { UserType } from "../utils/types";
import useHoursFrom from "@/utils/auxfuncs";

type UserInfoProp = {
  user: UserType;
  creationTime: Date;
};

function UserInfo({ user, creationTime }: UserInfoProp) {
  const hoursFromCreation = useHoursFrom(creationTime);
  
  return (
    <View style={styles.userInfoContainer}>
      <Image src={user.image} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text numberOfLines={1}>{user.name}</Text>
        <SecondaryText>
          @{user.username}
        </SecondaryText>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <SecondaryText>
          {hoursFromCreation}h
        </SecondaryText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 2,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 10,
    width: "100%",
  },
});

export default UserInfo;
