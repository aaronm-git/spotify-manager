// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRoles = {
  "DEVELOPER": "DEVELOPER",
  "USER": "USER"
};

const { Users } = initSchema(schema);

export {
  Users,
  UserRoles
};