import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum UserRoles {
  DEVELOPER = "DEVELOPER",
  USER = "USER"
}

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Users {
  readonly id: string;
  readonly name: string;
  readonly email?: string | null;
  readonly roler?: UserRoles | keyof typeof UserRoles | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}