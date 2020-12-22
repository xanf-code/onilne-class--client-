import Head from "next/head";
import Nav from "../components/nav";

export default function Index() {
  return (
    <>
      <Head>
        <title>Online Classroom</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <p>Index</p>
    </>
  );
}
