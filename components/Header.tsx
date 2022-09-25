import type { NextPage } from "next";
import Head from "next/head";

type HeaderProps = {
  title: string
}

const Header: NextPage<HeaderProps> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default Header;
