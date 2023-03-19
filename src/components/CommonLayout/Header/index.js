import Link from 'next/link';

import s from './Header.module.scss';

export default function Header({ setModal }) {
  return (
    <header className={s.header}>
      <div className={s.wrap}>
        <Link className={s.title} href="/">
          <span>Вся правда</span> о сайтах
        </Link>
        <button className={s.button} onClick={() => setModal('newReview')}>
          Написать отзыв
        </button>
      </div>
    </header>
  );
}
