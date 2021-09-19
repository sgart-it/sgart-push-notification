const sqlite3 = require('sqlite3');
const baseService = require('./baseService.js');

const init = async () => {
  console.log("init db");

  const sql = `CREATE TABLE IF NOT EXISTS subscriptions (
    subscriptionId INTEGER PRIMARY KEY AUTOINCREMENT,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL
  )`;

  return await baseService.dbExecute(sql, []);
};

// {subscription : { endpoint: '', keys: {p256dh: '', auth: ''}}}
const addSubscription = async (subscription) => {
  console.log("addSubscription", subscription);

  const s = await getSubscription(subscription.endpoint)
  if (s.success === true && s.data !== null && s.data.subscriptionId > 0) {
    const r = baseService.getResponse(true);
    r.message = 'exist';
    return r;
  }

  const sql = 'INSERT INTO subscriptions(endpoint, p256dh, auth) VALUES (?,?,?)';
  const params = [subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth];

  return await baseService.dbExecute(sql, params);
};

const deleteSubscription = async (endpoint) => {
  console.log("deleteSubscription", endpoint);

  const sql = 'DELETE FROM subscriptions WHERE endpoint=?';
  const params = [endpoint];

  return await baseService.dbExecute(sql, params);
};

const getSubscription = async (endpoint) => {
  console.log("getSubscription", endpoint);

  const sql = 'SELECT * FROM subscriptions WHERE endpoint=?';
  const params = [endpoint];

  return await baseService.dbGetSingle(sql, params);
};

const getSubscriptions = async () => {
  console.log("getSubscriptions all");

  const sql = 'SELECT * FROM subscriptions';

  return await baseService.dbGetMany(sql, []);
};
/*
var stmt = db.prepare("INSERT INTO xxxx VALUES (?)");
for (var i = 0; i < 10; i++) {
  stmt.run("...." + i);
}
stmt.finalize();
 
db.each("SELECT rowid AS id, info FROM xxxx", function (err, row) {
  console.log(row.id + ": " + row.info);
});
 
*/

module.exports = {
  init: init,
  addSubscription: addSubscription,
  deleteSubscription: deleteSubscription,
  getSubscription: getSubscription,
  getSubscriptions: getSubscriptions
};