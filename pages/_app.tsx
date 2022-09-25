import "../styles/globals.css";

import { createContext, useMemo, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

// import store from "./store";
// import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";

import Layout from "../components/Layout";

// 아폴로 클라이언트 생성.
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

// 컬러 모드 컨텍스트 생성.
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  // 컬러 모드 메모이제이션.
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    []
  );

  // 테마 메모이제이션.
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <>
      {/* <Provider store={store}> */}
        <ApolloProvider client={client}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseLine enableColorScheme />
              <Head>
                <meta name="keywords" content="app, game, pubdata" />
                <meta name="description" content="app, game, pubdata" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <Layout colorMode={colorMode}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </ApolloProvider>
      {/* </Provider> */}
    </>
  );
}
export default MyApp;
