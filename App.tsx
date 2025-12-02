import React, { useState } from 'react';
import VideoFeed from './components/VideoFeed';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';
import { useAuth } from './contexts/AuthContext';
import { Home, Search, PlusSquare, MessageSquare, User } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { isAuthenticated } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'search':
        return (
          <div className="h-full flex items-center justify-center text-gray-500">
             <div className="text-center">
               <Search size={48} className="mx-auto mb-2 opacity-50" />
               <p>Discover page coming soon</p>
             </div>
          </div>
        );
      case 'inbox':
        return isAuthenticated ? (
          <div className="h-full flex items-center justify-center text-gray-500">
             <div className="text-center">
               <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
               <p>No new messages</p>
             </div>
          </div>
        ) : (
          <AuthView />
        );
      case 'profile':
        return isAuthenticated ? <ProfileView /> : <AuthView />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex flex-col max-w-md mx-auto sm:max-w-full md:max-w-md lg:max-w-md xl:max-w-md shadow-2xl overflow-hidden border-x border-gray-800">
      
      {/* Top Navbar (Only show on Home) */}
      {activeTab === 'home' && (
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-center items-center pt-8 pb-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
           <div className="flex gap-4 pointer-events-auto font-bold text-lg drop-shadow-md">
              <button className="text-gray-400 hover:text-white transition-colors">Following</button>
              <div className="w-[1px] h-4 bg-gray-500/50 self-center"></div>
              <button className="text-white border-b-2 border-white pb-1">For You</button>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative bg-black">
         {renderContent()}
      </div>

      {/* Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black border-t border-gray-900 flex justify-around items-center z-30 px-2">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-white' : 'text-gray-500'}`}
        >
          <Home size={24} fill={activeTab === 'home' ? "currentColor" : "none"} />
          <span className="text-[10px]">Home</span>
        </button>

        <button 
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'search' ? 'text-white' : 'text-gray-500'}`}
        >
          <Search size={24} />
          <span className="text-[10px]">Discover</span>
        </button>

        <button className="flex flex-col items-center justify-center -mt-4">
           <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-12 h-8 rounded-lg flex items-center justify-center relative shadow-lg transform active:scale-90 transition-transform">
             <div className="absolute inset-0 bg-white mix-blend-overlay opacity-20 rounded-lg"></div>
             <PlusSquare size={20} className="text-black" fill="black" />
           </div>
        </button>

        <button 
          onClick={() => setActiveTab('inbox')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'inbox' ? 'text-white' : 'text-gray-500'}`}
        >
          <MessageSquare size={24} />
          <span className="text-[10px]">Inbox</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`}
        >
          <User size={24} fill={activeTab === 'profile' ? "currentColor" : "none"} />
          <span className="text-[10px]">Me</span>
        </button>
      </div>
    </div>
  );
};

export default App;