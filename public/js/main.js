const spinWheel = document.getElementById('spinWheel');
const spinBtn = document.getElementById('spin_btn');
const text = document.getElementById('text');
const gameAmount = document.getElementById('gameAmount');

const spinValues = [
  { minDegree: 61, maxDegree: 90, multiplier: 1 },
  { minDegree: 31, maxDegree: 60, multiplier: 2 },
  { minDegree: 0, maxDegree: 30, multiplier: 3 },
  { minDegree: 331, maxDegree: 360, multiplier: 4 },
  { minDegree: 301, maxDegree: 330, multiplier: 5 },
  { minDegree: 271, maxDegree: 300, multiplier: 6 },
  { minDegree: 241, maxDegree: 270, multiplier: 7 },
  { minDegree: 211, maxDegree: 240, multiplier: 8 },
  { minDegree: 181, maxDegree: 210, multiplier: 9 },
  { minDegree: 151, maxDegree: 180, multiplier: 10 },
  { minDegree: 121, maxDegree: 150, multiplier: 11 },
  { minDegree: 91, maxDegree: 120, multiplier: 12 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  '#E74C3C',
  '#7D3C98',
  '#2E86C1',
  '#138D75',
  '#F1C40F',
  '#D35400',
  '#138D75',
  '#F1C40F',
  '#b163da',
  '#E74C3C',
  '#7D3C98',
  '#138D75',
];
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: 'pie',
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: '#ffffff',
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      const amountWon = gameAmount.value * i.multiplier;
      text.innerHTML = `<p>Congratulations, You Have Won ${amountWon} FCFA! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/*---------------- Get date and time -----------------*/
var endtime = 10000; // Spin for 10000 milliseconds
/* --------------- Spinning Code --------------------- */
let rotationInterval;
spinBtn.addEventListener('click', () => {
  spinBtn.disabled = true;
  rotationInterval = window.setInterval(() => {
    spinChart.options.rotation =
      spinChart.options.rotation + Math.floor(Math.random() * 20);
    spinChart.update();
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */

function checkEndtime() {
  currentDate = new Date();
  endDate = new Date(endtime);
  setTimeout(checkEndtime, 1000);
  if (
    endtime != 0 &&
    spinBtn.disabled == true &&
    currentDate.getTime() > endDate.getTime()
  ) {
    clearInterval(rotationInterval);
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    generateValue(randomDegree);
    spinChart.options.rotation = randomDegree;
    spinChart.update();
  }
}
checkEndtime();
