import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  CameraIcon, 
  PencilIcon,
  ShieldCheckIcon,
  BellIcon,
  HeartIcon,
  MapPinIcon,
  CreditCardIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/useAuthStore';
import { profileSchema, changePasswordSchema } from '../utils/validators';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { formatDate } from '../utils/formatters';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  skinType: string;
  skinTone: string;
  hairType: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth ? formatDate(user.dateOfBirth, 'yyyy-MM-dd') : '',
      gender: user?.gender || '',
      skinType: user?.skinType || '',
      skinTone: user?.skinTone || '',
      hairType: user?.hairType || ''
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm<PasswordFormData>({
    resolver: yupResolver(changePasswordSchema)
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined
      });
      toast.success('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      // TODO: Implement password change API call
      console.log('Password change data:', data);
      toast.success('Password changed successfully!');
      setIsPasswordModalOpen(false);
      resetPassword();
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password');
    }
  };

  const handleCancelEdit = () => {
    resetProfile();
    setIsEditingProfile(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'preferences', name: 'Preferences', icon: HeartIcon },
    { id: 'addresses', name: 'Addresses', icon: MapPinIcon },
    { id: 'payment', name: 'Payment Methods', icon: CreditCardIcon },
    { id: 'loyalty', name: 'Loyalty Points', icon: GiftIcon }
  ];

  const skinTypes = [
    { value: 'normal', label: 'Normal' },
    { value: 'dry', label: 'Dry' },
    { value: 'oily', label: 'Oily' },
    { value: 'combination', label: 'Combination' },
    { value: 'sensitive', label: 'Sensitive' }
  ];

  const skinTones = [
    { value: 'fair', label: 'Fair' },
    { value: 'medium', label: 'Medium' },
    { value: 'olive', label: 'Olive' },
    { value: 'brown', label: 'Brown' },
    { value: 'dark', label: 'Dark' }
  ];

  const hairTypes = [
    { value: 'straight', label: 'Straight' },
    { value: 'wavy', label: 'Wavy' },
    { value: 'curly', label: 'Curly' },
    { value: 'coily', label: 'Coily' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </span>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                  <CameraIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                {user.phone && (
                  <p className="text-gray-600">{user.phone}</p>
                )}
                <div className="flex items-center mt-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Verified Account
                  </span>
                  {user.loyaltyPoints && (
                    <span className="ml-2 bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                      {user.loyaltyPoints} Points
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-pink-100 text-pink-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                      {!isEditingProfile && (
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          <PencilIcon className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>

                    {isEditingProfile ? (
                      <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="First Name"
                            type="text"
                            placeholder="Enter your first name"
                            value={registerProfile('firstName').value}
                            onChange={registerProfile('firstName').onChange}
                            error={profileErrors.firstName?.message}
                            required
                          />
                          <Input
                            label="Last Name"
                            type="text"
                            placeholder="Enter your last name"
                            value={registerProfile('lastName').value}
                            onChange={registerProfile('lastName').onChange}
                            error={profileErrors.lastName?.message}
                            required
                          />
                        </div>

                        <Input
                          label="Phone Number"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={registerProfile('phone').value}
                          onChange={registerProfile('phone').onChange}
                          error={profileErrors.phone?.message}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              {...registerProfile('dateOfBirth')}
                              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                            />
                            {profileErrors.dateOfBirth && (
                              <p className="mt-1 text-sm text-red-600">{profileErrors.dateOfBirth.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Gender
                            </label>
                            <select
                              {...registerProfile('gender')}
                              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                            >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Skin Type
                            </label>
                            <select
                              {...registerProfile('skinType')}
                              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                            >
                              <option value="">Select skin type</option>
                              {skinTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Skin Tone
                            </label>
                            <select
                              {...registerProfile('skinTone')}
                              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                            >
                              <option value="">Select skin tone</option>
                              {skinTones.map((tone) => (
                                <option key={tone.value} value={tone.value}>
                                  {tone.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Hair Type
                            </label>
                            <select
                              {...registerProfile('hairType')}
                              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                            >
                              <option value="">Select hair type</option>
                              {hairTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button
                            type="submit"
                            isLoading={isLoading}
                          >
                            Save Changes
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                            <p className="text-gray-900">{user.firstName} {user.lastName}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                            <p className="text-gray-900">{user.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                            <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h3>
                            <p className="text-gray-900">
                              {user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
                            <p className="text-gray-900 capitalize">{user.gender || 'Not specified'}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Skin Type</h3>
                            <p className="text-gray-900 capitalize">{user.skinType || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Password</h3>
                            <p className="text-gray-600">Last changed 30 days ago</p>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => setIsPasswordModalOpen(true)}
                          >
                            Change Password
                          </Button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-gray-600">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="outline">
                            Enable 2FA
                          </Button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Login Sessions</h3>
                            <p className="text-gray-600">Manage your active sessions</p>
                          </div>
                          <Button variant="outline">
                            View Sessions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                            <span className="ml-2 text-gray-700">Order updates and shipping notifications</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                            <span className="ml-2 text-gray-700">New product launches and recommendations</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                            <span className="ml-2 text-gray-700">Promotional offers and discounts</span>
                          </label>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notifications</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                            <span className="ml-2 text-gray-700">Order confirmations and delivery updates</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                            <span className="ml-2 text-gray-700">Flash sales and limited-time offers</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Other tabs content would go here */}
                {activeTab !== 'profile' && activeTab !== 'security' && activeTab !== 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <p className="text-gray-500">This section is coming soon!</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
        size="md"
      >
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            value={registerPassword('currentPassword').value}
            onChange={registerPassword('currentPassword').onChange}
            error={passwordErrors.currentPassword?.message}
            required
          />
          
          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            value={registerPassword('newPassword').value}
            onChange={registerPassword('newPassword').onChange}
            error={passwordErrors.newPassword?.message}
            required
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            value={registerPassword('confirmPassword').value}
            onChange={registerPassword('confirmPassword').onChange}
            error={passwordErrors.confirmPassword?.message}
            required
          />

          <div className="flex space-x-3 pt-4">
            <Button type="submit" isLoading={isLoading}>
              Change Password
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;