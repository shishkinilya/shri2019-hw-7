import React from 'react';

import Link from 'components/Link/Link';

import './footer.scss';

interface FooterProps {
  className: string;
}

export default function Footer(props: FooterProps) {
  return (
    <footer className={`Footer ${props.className}`}>
      <div className="Footer-Company">Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021</div>
      <div className="Footer-Stats">
        <span className="Footer-Version">UI: 0.1.15</span>
        <span className="Footer-Copyright">&copy; 2007—{new Date().getFullYear()} <Link to="https://ya.ru" target="_blank">Yandex</Link></span>
      </div>
    </footer>
  )
}
