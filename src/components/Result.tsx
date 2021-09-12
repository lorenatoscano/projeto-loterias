import '../styles/result.scss';

interface ResultProps {
  numbers: Array<string>;
}

export function Result(props: ResultProps) {
  const width = props.numbers.length === 6 ? '700px' : '600px';
  return (
    <div className="result">
      <div></div>
      <div className="ball-group" style={{ maxWidth: width }}>
        {
          props.numbers.map((number, key) => {
            return <div className="ball" key={key}>{number}</div>;
          })
        }
      </div>
      <div className="disclaimer">Este sorteio é meramente ilustrativo e não possui nenhuma ligação com a CAIXA.</div>
    </div>
  );
}