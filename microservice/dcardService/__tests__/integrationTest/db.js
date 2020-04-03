require('dotenv').config()
const users = require('../../model/users')

// test('Should create user', async () => {
//   const ans = await users.createUser({
//     name: "asdfasdf",
//     birthday: "2018-01-07 23:48:16",
//     socialize: "asdfasdf",
//     school: "asdfasdf",
//     department: "asdfasdf",
//     interestsAndExpertise: "asdfasdf",
//     club: "asdfasdf",
//     course: "asdfasdf",
//     country: "asdfasdf",
//     troubles: "asdfasdf",
//     exchangeable: "asdfasdf",
//     trying: "asdfasdf"
//   })
//   console.log(ans)
// });

test('Should query user by random', async () => {
  const ans = await users.queryUserByRandom()
  console.log(ans)
});