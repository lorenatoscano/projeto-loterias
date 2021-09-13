import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useContext } from 'react';
import { LotteriesContext } from '../contexts/LotteriesContext';

import '../styles/select.scss';
interface SelectProps {
  label: string;
}

export function Select(props: SelectProps) {
  const { lotteries } = useContext(LotteriesContext);

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
              <Link to={`/${lottery.id}`}>{lottery.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
