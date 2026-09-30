import Menu from './Menu';

export default function Sidebar() {
  return (
    <aside className="rail">
      <Menu />

      <div className="rail-label">FOLIO — EDITION</div>

      <div className="rail-bottom">
        <div className="rail-brand font-serif-2">MICHAEL</div>
        <div className="rail-year">© 2026</div>
      </div>
    </aside>
  );
}