import { useRef } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { Rating } from 'react-simple-star-rating';

import { options, labels, generateData } from './chartSettings';

import s from './Main.module.scss';

export default function Main({
  totalRating,
  reviews,
  filterReviews,
  activeFilterId,
  activeCategoryId,
}) {
  ChartJS.register(CategoryScale, LinearScale, BarElement);

  const chartRef = useRef();

  return (
    <section className={s.article}>
      <div className={s.mainContainer}>
        <div className={s.titleContainer}>
          <h1>LEOMAX.RU — отзывы</h1>
          <p className={s.text}>Отзывы клиентов, сотрудников, отзывы о работодателях</p>
        </div>
        <div className={s.statistics}>
          <div className={s.ratingContainer}>
            <span className={s.grade}>{String(totalRating).replace('.', ',')}</span>
            <Rating allowFraction={true} initialValue={totalRating} size={31} readonly={true} />
          </div>
          <p className={s.statisicsText}>{`${reviews?.length || 0} отзывов / 3235 просмотров`}</p>
        </div>
      </div>
      <div className={s.chartWrap}>
        <p className={s.resultText}>Результаты отзывов</p>
        <div className={s.chartInner}>
          <Bar
            ref={chartRef}
            options={{
              ...options,
              scales: {
                ...options.scales,
                x: {
                  ...options.scales.x,
                  ticks: {
                    ...options.scales.x.ticks,
                    color: function (context) {
                      return context.index === activeFilterId - 1 ? '#FCAF17' : '#676767';
                    },
                  },
                },
              },
            }}
            data={generateData(labels, reviews)}
            onClick={(e) =>
              filterReviews(getElementAtEvent(chartRef.current, e)[0]?.index + 1, activeCategoryId)
            }
          />
        </div>
      </div>
    </section>
  );
}
