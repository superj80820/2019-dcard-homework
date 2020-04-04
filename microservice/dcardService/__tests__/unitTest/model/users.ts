import * as users from '../../../model/users'

test('Should get create args', () => {
  const promisePgPoolHandler = jest.fn()
  users.createUser({
    name: "John",
    birthday: "2018-01-07 23:48:16",
    socialize: "Single",
    school: "National Taiwan University",
    department: "Computer Science",
    interestsAndExpertise: "Basketball",
    club: "Guitar",
    course: "Machine Learning",
    country: "Taipei",
    troubles: "Swimming",
    exchangeable: "Drawing",
    trying: "Climbing"
  }, promisePgPoolHandler)

  expect(promisePgPoolHandler).toHaveBeenCalledWith(
  `
    INSERT INTO users (name, birthday, socialize, school, department, "interestsAndExpertise", club, course, country, troubles, exchangeable, trying)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
  `, [
    "John",
    "2018-01-07 23:48:16",
    "Single",
    "National Taiwan University",
    "Computer Science",
    "Basketball",
    "Guitar",
    "Machine Learning",
    "Taipei",
    "Swimming",
    "Drawing",
    "Climbing"
  ]);
});

test('Should get query string', () => {
  const promisePgPoolHandler = jest.fn()
  users.queryUserByRandom(promisePgPoolHandler)

  expect(promisePgPoolHandler).toHaveBeenCalledWith(`
    SELECT * FROM users  
    ORDER BY random()
    LIMIT 1
  `, []);
});