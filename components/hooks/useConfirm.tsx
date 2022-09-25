const useConfirm = (message: string = "", onConfirm: () => void, onReject: () => void) => {
  const runConfrim = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onReject();
    }
  };

  return runConfrim;
};
export default useConfirm;
