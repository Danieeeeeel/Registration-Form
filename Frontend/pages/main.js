import Head from "next/head";
import Atmosphere from "../components/Atmosphere";
import Form from "../components/Form";

export default function Main() {
  return (
    <div>
      <Head>
        <title>Registration Form</title>
      </Head>
      <Form />
      <Atmosphere />
    </div>
  );
}
