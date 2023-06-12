import dayjs from 'dayjs';
import { getRandomInteger, getRandomElement } from '../utils/random.js';

const COUNT = 50;
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const ENDPOINTS = ['Amsterdam', 'Chamonix', 'Geneva', 'Vena', 'Berlin', 'Praga', 'Belgrad', 'Cair', 'Riga',];

const DESCRIPTION = ['Nunc fermentum tortor ac porta dapibus.',
  'Fusce tristique felis at fermentum pharetra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam erat volutpat.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
];

const CountEelements = {
  MIN: 1,
  MAX: 9
};

const NumberPicture = {
  MIN: 1,
  MAX: 60
};

const ServicePrice = {
  MIN: 1,
  MAX: 1000
};

const descriptionGenerate = () => {
  let description = '';
  for (let i = 0; i < getRandomInteger(CountEelements.MIN, CountEelements.MAX); i++) {
    description += ` ${getRandomElement(DESCRIPTION)}`;
  }
  return description;
};

const pictureGenerate = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(NumberPicture.MIN, NumberPicture.MAX)}`,
  description: descriptionGenerate(),
});

const endPointGenerate = (id) => ({
  id,
  description: descriptionGenerate(),
  name: ENDPOINTS[id],
  pictures: Array.from({length: getRandomInteger(CountEelements.MIN, CountEelements.MAX)}, pictureGenerate),
});

const getEndPoints = () => Array.from({length: ENDPOINTS.length}).map((value, index) => endPointGenerate(index));

const offerGenerate = (id, pointType) => ({
  id,
  title: `offer for ${pointType}`,
  price: getRandomInteger(ServicePrice.MIN, ServicePrice.MAX)
});

const TypesOfferGenerate = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomInteger(CountEelements.MIN, CountEelements.MAX)}).map((value, index) => offerGenerate(index + 1, pointType)),
});

const typeOffersGet = () => Array.from({length: TYPES.length}).map((value, index) => TypesOfferGenerate(TYPES[index]));

const offersByType = typeOffersGet();

const destinations = getEndPoints();

const generatePoint = (id) => {
  const offersByTypePoint = getRandomElement(offersByType);
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    basePrice: getRandomInteger(ServicePrice.MIN, ServicePrice.MAX),
    dateFrom: dayjs().add(getRandomInteger(-3, 0), 'Day').add(getRandomInteger(-2, 0), 'Hour').add(getRandomInteger(-59, 0), 'Minute'),
    dateTo: dayjs().add(getRandomInteger(0, 2), 'Hour').add(getRandomInteger(0, 59), 'Minute'),
    destinationId: getRandomElement(destinations).id,
    id,
    isFavorite: Boolean(getRandomInteger()),
    offerIds: Array.from({length: getRandomInteger(0, allOfferIdsByTypePoint.length)}).map(() => allOfferIdsByTypePoint[getRandomInteger(0, allOfferIdsByTypePoint.length - 1)]),
    type: offersByTypePoint.type,
  };
};

const getAllPoints = () => Array.from({length: COUNT}).map((value, index) => generatePoint (index + 1));

export { getAllPoints, getEndPoints, typeOffersGet };