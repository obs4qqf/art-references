const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const storageBucket = require('./storage.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: storageBucket.bucket
});

const db = admin.firestore();
const bucket = admin.storage().bucket()

module.exports = {db, bucket};