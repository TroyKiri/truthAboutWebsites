import Link from 'next/link';

import s from './Footer.module.scss';

export default function Footer({ setModal }) {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <p className={s.title}>Вся правда о сайтах © {new Date().getFullYear()}</p>
        <Link href="/terms" className={s.link}>
          Пользовательское соглашение
        </Link>
        <Link
          href="/"
          className={s.link}
          onClick={(e) => {
            e.preventDefault();
            setModal('feedback');
          }}
        >
          обратная связь
        </Link>
      </div>
    </footer>
  );
}
