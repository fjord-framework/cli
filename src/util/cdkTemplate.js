const { execSync } = require("child_process");
const NODE_ROOT = execSync("npm root -g").toString().trim();

const path = require('path');
const APP_PATH = path.resolve(NODE_ROOT, 'fjord_cli', 'lib', 'FjordApp.js')

module.exports = templateObj = {
  "app": `node ${APP_PATH}`,
  "context": {
    "@aws-cdk/aws-apigateway:usagePlanKeyOrderInsensitiveId": "true",
    "@aws-cdk/core:enableStackNameDuplicates": "true",
    "aws-cdk:enableDiffNoFail": "true",
    "@aws-cdk/core:stackRelativeExports": "true",
    "@aws-cdk/aws-ecr-assets:dockerIgnoreSupport": "true",
    "@aws-cdk/aws-secretsmanager:parseOwnedSecretName": "true",
    "@aws-cdk/aws-kms:defaultKeyPolicies": "true",
    "@aws-cdk/aws-s3:grantWriteWithoutAcl": "true",
    "@aws-cdk/aws-ecs-patterns:removeDefaultDesiredCount": "true",
    "@aws-cdk/aws-rds:lowercaseDbIdentifier": "true",
    "@aws-cdk/aws-efs:defaultEncryptionAtRest": "true",
    "@aws-cdk/aws-lambda:recognizeVersionProps": "true"
  },
  "requireApproval": "never"
}
