'use client';

import { IUser } from '@/interfaces';
import { FC } from 'react';
import { UserListItem } from './UserListItem';

interface Props {
  users: IUser[];
}

export const UserTable: FC<Props> = ({ users }) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            #ID
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Name
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};
