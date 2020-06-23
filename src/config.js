export default {
  MAX_ATTACHMENT_SIZE: 50000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "dancetown-app-api-dev-attachmentsbucket-ic13uq6xqxwk"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://a8ri42gnh0.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Y4Pi1n6F0",
    APP_CLIENT_ID: "1oft85bvo8q9ltflrrkl7cblt0",
    IDENTITY_POOL_ID: "us-east-1:d9bc91be-17e4-413d-87f5-b89859a5dac9"
  },
  social: {
    FB: "192446828747386"
  }
};
