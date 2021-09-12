import '../styles/select.scss';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useContext } from 'react';
import { LotteriesContext } from '../contexts/LotteriesContext';
interface SelectProps {
  label: string;
}

export function Select(props: SelectProps) {
  const { lotteries, handleSelection } = useContext(LotteriesContext);

  return (
    <div className="dropdown">
      <div tabIndex={0} className="m-1 select-btn">
        {props.label}
        <ArrowDropDownIcon />
      </div>
      <ul tabIndex={0} className="ml-1 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        {lotteries?.map(lottery => {
          return (
            <li key={lottery.id}>
              <button onClick={async () => { await handleSelection(lottery.id) }}>{lottery.name}</button>
              {/* <a href={`/${lottery.id}`}>{lottery.name}</a> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
