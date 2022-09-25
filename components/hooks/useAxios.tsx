// FIXME: 무한 반복에 빠져버림
import { useState, useEffect, useCallback } from "react";
import defaultAxios from "axios";

const useAxios = (options: { url: string }, axios = defaultAxios) => {
  const [trigger, setTrigger] = useState(0);
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });

    setTrigger(Date.now());
  };

  const axiosFetch = useCallback(() => {
    axios(options)
      .then((res) => {
        setState(
          (state) =>
            (state = {
              ...state,
              loading: false,
              data: res.data,
            })
        );
      })
      .catch((error) => {
        setState((state) => (state = { ...state, loading: false, error }));
      });
  }, [options, axios]);

  useEffect(() => {
    axiosFetch();
  }, [axiosFetch]);

  return { ...state, refetch };
};
export default useAxios;
