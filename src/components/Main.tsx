import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { LotteriesContext } from "../contexts/LotteriesContext";
import { Result } from "./Result";
import { Sidebar } from "./Sidebar";

export function Main() {
  const { handleSelection } = useContext(LotteriesContext);
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      await handleSelection(Number(id));
    })()
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="app">
      <Sidebar />
      <Result />
    </div>
  );
}