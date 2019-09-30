const jwt = require('jsonwebtoken');

function GetUserById(ctx) {
    const Authorization = ctx.request.get('Authorization');
    console.log('5 -- in user resolver -- Authorization: ', Authorization);
    if (Authorization) {
        // no need prefix 'Bearer '
        const token = Authorization.replace('Bearer ', '');
        // when use jwt.sign, the key is userId
        const { userId } = jwt.verify(token, process.env.APP_SECRET)
        console.log('11 -- in user resolver -- userId: ', userId);
        return userId;
    }
    throw new Error('Not Authorized User');
}

module.exports = { GetUserById };

/* {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazEzNmp3N3hlNzlhMGIwOTZkcHplbWVvIiwiaWF0IjoxNTY5NzE1MzYzLCJleHAiOjE1Njk3MjYxNjN9.RDhji4TPwHnwul0FnI-VhyesTuUXw6mwCwTimDlu2co"
  } */

