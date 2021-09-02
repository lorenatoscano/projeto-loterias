import '../styles/select.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface SelectProps {
  label: string
}

export function Select(props: SelectProps) {
  return (
    <div className="dropdown">
      <div tabIndex={0} className="m-1 select-btn">
        {props.label}
        <ArrowDropDownIcon />
      </div>
      <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a href="#">Item 1</a>
        </li>
        <li>
          <a href="#">Item 2</a>
        </li>
        <li>
          <a href="#">Item 3</a>
        </li>
      </ul>
    </div>
  );
}
