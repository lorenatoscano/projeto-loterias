import { Fragment, useContext } from "react";
import { LotteriesContext } from "../contexts/LotteriesContext";
import { Loading } from "./Loading";
import { Result } from "./Result";
import { Sidebar } from "./Sidebar";

export function Main() {
  const { isLoading } = useContext(LotteriesContext);

  return (
    <div className="app">
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Sidebar />
          <Result />
        </Fragment>
      )}
    </div>
  );
}
