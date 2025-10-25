import React from "react";
import AppRoutes from "./routes";

import { GET_CONTACT_PERSONS } from "./common/api/graphql/mutation/company";
import { useFetch } from "./common/hooks/gqlhooks";
// import { useFetch } from "./common/hooks/gqlhooks";

function App() {
  // const { data, loading, error } = useFetch(GET_CONTACT_PERSONS, {
  //   filters: {},
  // });
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  // console.log("Companies 2:", data);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
