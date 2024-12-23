/* eslint-disable react/no-children-prop */
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
function App() {
  return (
    <>
      {/* <Header /> */}
      <Layout>
        <Outlet />
      </Layout>
      {/* <Footer /> */}
    </>
  );
}

export default App;
