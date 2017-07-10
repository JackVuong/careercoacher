import FireBase from 'firebase';
import _ from 'lodash';


const config = {
    apiKey: 'AIzaSyD2LDDht1dtPZhvjFThqxGwTbQRenWegv8',
    authDomain: 'devvip-43095.firebaseapp.com',
    databaseURL: 'https://devvip-43095.firebaseio.com',
    storageBucket: 'devvip-43095.appspot.com',
    messagingSenderId: '584103741631'
};

const firebase = FireBase.initializeApp(config);

export const database = firebase.database();
export const getData = (part) => database.ref(part).once('value').then((snapshot) => snapshot.val())
export const update = (part, data) => database.ref().update({[part]: data});
export const writeAnswers = (user, data) => database.ref(`answers/${user}`).set(data);

const getLastIndexDefault = (data) => _.isEmpty(data) ? -1 : _.last(Object.keys(data))

export const getLastIndex = (part) => getData(part).then((data) => getLastIndexDefault(data))
export default firebase;

