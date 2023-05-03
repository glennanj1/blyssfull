import React, {useState, useEffect} from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";

const links = {
  'Privacy': 'https://app.termly.io/document/privacy-policy/ed610438-c3de-4830-a382-7a8384f47d94',
  'Cookie': 'https://app.termly.io/document/cookie-policy/d4ad81e4-4e41-4d76-8c6b-ce0c708aa8eb',
  'Terms': 'https://app.termly.io/document/terms-and-conditions/33ae671b-2152-49cc-9829-2cd17eeaf1c6',
  'Disclaimer': 'https://app.termly.io/document/disclaimer/834d821e-3b71-480d-b411-7a52717725d1'
}

export default function Policies({type}) {
  const [link, setLink] = useState(null);
  useEffect(() => {
    switch (type) {
      case 'Privacy':
        setLink(links['Privacy'])
        break;
      case 'Cookie':
        setLink(links['Cookie'])
        break;
      case 'Terms':
        setLink(links['Terms'])
        break;
      case 'Disclaimer':
        setLink(links['Disclaimer'])
        break;
      default:
        setLink(setLink(null))
        break;
    }
  },[type])
  return (
    <>
      <Header />
      <div
        style={{ position: "relative", top: "100px", marginBottom: "100px" }}
      >
        <iframe
          style={{ height: "80vh", width: "100vw" }}
          src={link}
        ></iframe>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps (context) {
  console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  debugger;
  if (context.query?.type) {
    //you can make DB queries using the data in context.query
    return {
        props: { 
           type: context.query?.type //pass it to the page props
        }
    }
  } else {
    return {
      props: {
        type: 'Privacy'
      }
    }
  }
}
