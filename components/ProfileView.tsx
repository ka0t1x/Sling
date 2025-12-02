import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, LogOut, Grid, Lock, Bookmark } from 'lucide-react';

const ProfileView: React.FC = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  return (
    <div className="h-full w-full bg-black text-white overflow-y-auto pb-20 animate-in slide-in-from-right duration-300">
      {/* Top Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 flex justify-between items-center p-4 border-b border-gray-800">
        <div className="w-6" /> {/* Spacer */}
        <h1 className="font-bold text-lg">{user.username}</h1>
        <button onClick={logout} className="text-gray-400 hover:text-white">
          <LogOut size={24} />
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="relative mb-4">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-24 h-24 rounded-full border-2 border-gray-800 object-cover"
          />
        </div>
        
        <h2 className="text-xl font-bold mb-1">@{user.username}</h2>
        <p className="text-sm text-gray-400 px-8 text-center mb-6">{user.bio}</p>

        <div className="flex items-center gap-12 mb-8">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{user.stats.following}</span>
            <span className="text-xs text-gray-500">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{user.stats.followers}</span>
            <span className="text-xs text-gray-500">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{user.stats.likes}</span>
            <span className="text-xs text-gray-500">Likes</span>
          </div>
        </div>

        <div className="flex gap-2 w-full px-12 mb-6">
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
            Edit Profile
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-lg text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex border-t border-gray-800">
        <button className="flex-1 flex justify-center py-3 border-b-2 border-white">
          <Grid size={20} />
        </button>
        <button className="flex-1 flex justify-center py-3 text-gray-500 hover:text-gray-300">
          <Lock size={20} />
        </button>
        <button className="flex-1 flex justify-center py-3 text-gray-500 hover:text-gray-300">
          <Bookmark size={20} />
        </button>
      </div>

      {/* Content Grid (Mock) */}
      <div className="grid grid-cols-3 gap-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div key={item} className="aspect-[3/4] bg-gray-900 relative group cursor-pointer overflow-hidden">
            <img 
              src={`https://picsum.photos/300/400?random=${item + 10}`} 
              alt="Video thumbnail"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white drop-shadow-md">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               <span className="text-[10px] font-bold">{(Math.random() * 50).toFixed(1)}k</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;