import { useState } from 'react';
import Head from 'next/head';

import CommonLayout from '@/components/CommonLayout';
import Terms from '@/components/Terms';
import Modal from '@/components/Modal';
import NewReviewForm from '@/components/Forms/NewReviewForm';
import Feedback from '@/components/Forms/Feedback';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function RulesSection() {
  const [modal, setModal] = useState(null);
  return (
    <>
      <Head>
        <title>Отзывы о компаниях</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommonLayout setModal={setModal}>
        <main>
          <Breadcrumbs nameOfHomePage="Главная" />
          <Terms />
        </main>
      </CommonLayout>
      {modal && <Modal setModal={setModal}>{modal === 'newReview' ? <NewReviewForm /> : modal === 'feedback' ? <Feedback /> : <h1>Комментарий</h1>}</Modal>}
    </>
  );
}
