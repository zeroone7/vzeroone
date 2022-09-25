const useNotification = (title: string, options: { body: string }) => {
  if (!("Notification" in window)) {
    return;
  }

  const runNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      })
    } else {
      new Notification(title, options);
    }
  };

  return runNotification;
};
export default useNotification;
