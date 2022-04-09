export function getRandomNumber (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function generateFigure () {
  const figure = {};
  const forms = ['triangle', 'rectangle', 'circle'];

  figure.id = Date.now();
  figure.form = forms[getRandomNumber(0, forms.length - 1)];
  figure.color = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`;
  figure.weight = getRandomNumber(1, 10);
  figure.positionX = getRandomNumber(1, 100);
  figure.positionY = 0;

  return figure;
}

export function getCollision (obj1, obj2, range = 0) {
  const elem1 = obj1.getBoundingClientRect();
  const elem2 = obj2.getBoundingClientRect();

  return (elem1.bottom + range >= elem2.top);
}

export function compareBalance (arr, side = 'left') {
  let totalWeight = 0;
  arr.forEach(figure => {
    let index;
    if (side === 'left') index = (100 - figure.positionX) / 100;
    else index = figure.positionX / 100;

    const weightWidthIndex = figure.weight * index;
    totalWeight += weightWidthIndex;
  });

  if (side === 'left') return Math.floor(totalWeight) * -1;
  else return Math.floor(totalWeight);
}