module.exports = {
  async up(db, client) {
    await db.createCollection("limit", { capped : true, size : 5242880, max : 5000 } )
    await db.collection('limit').createIndex({ipaddress: 1}, {"unique": true})
  },

  async down(db, client) {
    await db.collection('limit').drop()
  }
};
