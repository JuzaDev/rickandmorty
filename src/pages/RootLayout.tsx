import { Outlet } from "react-router-dom";

export default function RootLayout(): JSX.Element {
  return (
    <>
      {/* <main> */}
      <Outlet />
      {/* </main> */}
    </>
  );
}