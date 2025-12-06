import { useState } from 'react';
import { User, Shield, Palette } from 'lucide-react';
import UpdateUser from '../Components/UpdateUser';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="bg-[#0B0B0F] w-full h-screen p-10 overflow-y-auto overflow-x-hidden">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <h3 className="text-gray-400 mt-2">Manage your account and preferences</h3>

        {/* Tab Navigation */}
        <div className="flex gap-8 mt-8 border-b border-gray-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-400'
                }`}
              >
                <Icon size={18} />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {activeTab === 'profile' && (
            <>
              <h2 className="text-xl font-semibold text-white mb-8">Profile Settings</h2>
              <UpdateUser />
            </>
          )}

          {activeTab === 'security' && (
            <>
              <h2 className="text-xl font-semibold text-white mb-8">Security Settings</h2>
              <div className="text-gray-400">Security settings coming soon...</div>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              <h2 className="text-xl font-semibold text-white mb-8">Appearance Settings</h2>
              <div className="text-gray-400">Appearance settings coming soon...</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
