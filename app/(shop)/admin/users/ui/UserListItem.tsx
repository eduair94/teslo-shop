import { changeUserRole } from '@/actions';
import { IUser } from '@/interfaces';
import { FC } from 'react';

interface Props {
  user: IUser;
}

export const UserListItem: FC<Props> = ({ user }) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.id.split('-').at(-1)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <select
          value={user.role}
          onChange={(e) => changeUserRole(user.id, e.target.value)}
          className="text-sm text-gray-900 w-full p-2"
          name="role"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </td>
    </tr>
  );
};
