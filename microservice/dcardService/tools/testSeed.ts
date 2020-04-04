import * as dotenv from "dotenv";
dotenv.config();
import * as users from '../model/users'

(async () => {
  const [, createUserJohnError] = await users.createUser({
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
  })
  if (createUserJohnError) {
    console.error(`Got error when createUserJohn ${createUserJohnError}`)
  }
  const [, createUserYorkError] = await users.createUser({
    name: "York",
    birthday: "2017-01-07 23:48:16",
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
  })
  if (createUserYorkError) {
    console.error(`Got error when createUserYork ${createUserYorkError}`)
  }
})()