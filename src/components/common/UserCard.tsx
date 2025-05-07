import { useState } from "react";
import { Edit, Save, Trash2, X } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image?: string;
}

interface UserCardProps {
  user: User;
  onEdit: (id: number, userData: Partial<User>) => void;
  onDelete: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(user.id, {
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      email: editedUser.email,
      username: editedUser.username,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white hover:shadow-md transition-shadow group">
      {isEditing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={editedUser.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={editedUser.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-1">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </div>
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <div className="flex items-center gap-1">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-sm font-semibold">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit User"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Delete User"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            <p className="mb-1">
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {user.email}
            </p>
            <p className="mb-1">
              <span className="font-medium text-gray-700">ID:</span> {user.id}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
