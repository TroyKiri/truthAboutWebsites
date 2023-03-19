export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 16,
          weight: 700,
        },
        color: '#676767',
      },
      border: {
        display: false,
      },
    },
    y: {
      display: false,
      stacked: true,
    },
  },
  onHover: (event, chartElement) => {
    if (chartElement.length == 1) {
      event.native.target.style.cursor = 'pointer';
    }
  },
};

export const labels = [1, 2, 3, 4, 5];

export const generateData = (labels, reviews) => {
  return {
    labels,
    datasets: [
      {
        data: labels.map((item) =>
          reviews.reduce(
            (prevValue, review) => (review.ratings === item ? (prevValue += 1) : prevValue),
            0
          )
        ),
        backgroundColor: '#FCAF17',
        hoverBackgroundColor: '#FBD620',
        borderRadius: 6,
        cursor: 'pointer',
      },
      {
        data: labels.map(
          (item) =>
            reviews.length -
            reviews.reduce(
              (prevValue, review) => (review.ratings === item ? (prevValue += 1) : prevValue),
              0
            )
        ),
        backgroundColor: '#F3F3F3',
        borderRadius: 6,
      },
    ],
  };
};
