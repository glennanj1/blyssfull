/* First make sure that you have installed the package */
  
  /* If you are using yarn */
  // yarn add @calcom/embed-react
  
  /* If you are using npm */
  // npm install @calcom/embed-react
  
  import Cal, { getCalApi } from "@calcom/embed-react";
  import { useEffect } from "react";
  export default function Calcom() {
	useEffect(()=>{
	  (async function () {
		const cal = await getCalApi();
		cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":" "});
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
		calLink="jfootball81/15min"
		style={{width:"100%",height:"100%",overflow:"scroll"}}
		config={{layout: 'month_view'}}
		calOrigin="https://calendar.glennan.cloud"
		calJsUrl="https://calendar.glennan.cloud/embed/embed.js"
		/>
	);
  };