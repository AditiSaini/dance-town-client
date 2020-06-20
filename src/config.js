export default {
  MAX_ATTACHMENT_SIZE: 50000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "dance-town-app-api-dev-0-attachmentsbucket-1m6dsoqfa81qq"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://1z9h7oowzl.execute-api.us-east-1.amazonaws.com/dev-0"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_FmaY7lyDe",
    APP_CLIENT_ID: "l21rmjvnvl6ov8l9b23f7q7if",
    IDENTITY_POOL_ID: "us-east-1:23fdb785-602c-4591-97b6-f687b3be51fe"
  },
  social: {
    FB: "192446828747386"
  }
};
