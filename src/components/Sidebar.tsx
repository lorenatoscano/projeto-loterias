import { Select } from './Select';
import logoImg from '../assets/images/logo.svg';
import '../styles/sidebar.scss';

export function Sidebar() {
  let name = 'mega-sena';

  return (
    <div className="sidebar" style={{ backgroundColor: '#6BEFA3' }}>
      <Select label={name} />

      <div className="logo">
        <img src={logoImg} alt="Logo" width="50px" />
        <span>{name}</span>
      </div>

      <div className="contest">
        <span>Concurso</span>
        <span>4531 - 07/04/2020</span>
      </div>
    </div>
  );
}