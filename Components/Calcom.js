/* First make sure that you have installed the package */
  
  /* If you are using yarn */
  // yarn add @calcom/embed-react
  
  /* If you are using npm */
  // npm install @calcom/embed-react
  
  import Cal, { getCalApi } from "@calcom/embed-react";
  import { useEffect } from "react";
  export default function Calcom(props) {
	useEffect(()=>{
	  (async function () {
		const cal = await getCalApi();
		cal("ui", {"styles":{"branding":{"brandColor":"#a33eb1"}},"hideEventTypeDetails":false,"layout":" "});
		cal("on", {
			action: "bookingSuccessful",
			callback: (e) => {
			  const { data, type, namespace } = e.detail;
			  // move to next stage additional services / checkout
			  console.log(e); // Handle the booking success event
			},
		  });
	  })();
	}, [])
	return (
		<Cal
			calLink={`blyssfullmagick/${props?.theurl}`}
			style={{width:"100%",height:"100%",overflow:"scroll"}}
			config={{layout: 'month_view'}}
			calOrigin="https://calendar.glennan.cloud"
			calJsUrl="https://calendar.glennan.cloud/embed/embed.js"
		/>
	);
  };