import Head from 'next/head';
import { useRouter } from 'next/router';

import CommonLayout from '@/components/CommonLayout';
import Main from '@/components/Main';
import Info from '@/components/Info';
import Reviews from '@/components/Reviews';

import { reviews, categories } from '@/common/reviews/reviews';
import { useState, useEffect, useRef } from 'react';
import Modal from '@/components/Modal';
import NewReviewForm from '@/components/Forms/NewReviewForm';
import Feedback from '@/components/Forms/Feedback';
import NewCommentForm from '@/components/Forms/NewCommentForm';

import { COUNT_OF_REVIEWS_TO_DISPLAY } from '@/common/reviews/reviews';

import s from '@/styles/Home.module.scss';

export default function Home() {
  const router = useRouter();

  const reviewsRef = useRef(null);
  const [totalRating, setTotalRating] = useState(0);
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const [rating, setRating] = useState(null);
  const [reviewsToDisplay, setReviewsToDisplay] = useState(reviews);

  const [modal, setModal] = useState(null);

  const [countToDisplay, setCountOfDisplay] = useState(COUNT_OF_REVIEWS_TO_DISPLAY);

  useEffect(() => {
    if (router.query.category) {
      setActiveCategoryId(+router.query.category);
    }
  }, [router]);

  useEffect(() => {
    setTotalRating(reviews?.reduce((prevValue, review) => (prevValue += review.ratings), 0) / reviews.length || 0);
  }, []);

  useEffect(() => {
    if (rating === null && activeCategoryId === null) {
      setReviewsToDisplay(reviews);
    } else {
      setReviewsToDisplay(
        reviews.filter((item) => {
          if (rating && activeCategoryId) return item.ratings === rating && item.category === activeCategoryId;
          if (rating && !activeCategoryId) return item.ratings === rating;
          if (!rating && activeCategoryId) return item.category === activeCategoryId;
        })
      );
    }
  }, [rating, activeCategoryId]);

  const filterReviews = (grade, categoryId) => {
    setCountOfDisplay(COUNT_OF_REVIEWS_TO_DISPLAY);
    if (grade) {
      setRating(grade);
      setActiveFilterId(grade);
    } else {
      setRating(null);
      setActiveFilterId(null);
    }

    categoryId ? setActiveCategoryId(categoryId) : setActiveCategoryId(null);

    setTimeout(() => {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      <Head>
        <title>Вся правда о сайтах</title>
        <meta name="description" content="Вся правда о сайтах" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommonLayout setModal={setModal}>
        <main>
          <div className={s.inner}>
            <Main totalRating={totalRating} reviews={reviews} filterReviews={filterReviews} activeFilterId={activeFilterId} activeCategoryId={activeCategoryId} />
            <Info totalRating={totalRating} setModal={setModal} reviews={reviews} filterReviews={filterReviews} categories={categories} rating={rating} activeCategoryId={activeCategoryId} />
            <section ref={reviewsRef} className={s.reviewsWrap}>
              <Reviews reviews={reviewsToDisplay} countToDisplay={countToDisplay} setCountOfDisplay={setCountOfDisplay} />
            </section>
          </div>
        </main>
      </CommonLayout>
      {modal && <Modal setModal={setModal}>{modal === 'newReview' ? <NewReviewForm /> : modal === 'feedback' ? <Feedback /> : <NewCommentForm setModal={setModal} />}</Modal>}
    </>
  );
}
