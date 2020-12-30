import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "FlashcardApp:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
    .catch((e) => console.log(e));
}

export function setLocalNotification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data: string | null) => (data === null ? null : JSON.parse(data)))
    .then((data: boolean | null) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(
          ({ status }: { status: string }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync()
                .catch((e) => console.log(e))
                .then(() => {
                  Notifications.scheduleNotificationAsync({
                    content: {
                      title: "Use flashcards today!",
                      body:
                        "👋 don't forget to memorize with the flash cards App!",
                    },
                    trigger: {
                      hour: 13,
                      minute: 0,
                      repeats: true,
                    },
                  });
                });
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          }
        );
      }
    })
    .catch((e) => console.log(e));
}
