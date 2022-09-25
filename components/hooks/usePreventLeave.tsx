// FIXME: 주석한 코드의 문제로 작동안함
const usePreventLeave = () => {
  const listener = (event: Event) => {
    event.preventDefault();
    // event.returnValue = "";
  };

  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () => window.removeEventListener("beforeunload", listener);

  return { enablePrevent, disablePrevent };
};
export default usePreventLeave;
