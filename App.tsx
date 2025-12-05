import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { MembershipView } from './views/MembershipView';
import { MarketingView } from './views/MarketingView';
import { DistributionView } from './views/DistributionView';
import { AppTab } from './types';
import { User, Gift, Share2, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.MARKETING);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.MEMBERSHIP:
        return <MembershipView />;
      case AppTab.MARKETING:
        return <MarketingView />;
      case AppTab.DISTRIBUTION:
        return <DistributionView />;
      default:
        return <MarketingView />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case AppTab.MEMBERSHIP: return "我的会员";
      case AppTab.MARKETING: return "营销活动";
      case AppTab.DISTRIBUTION: return "分销中心";
    }
  };

  return (
    <MobileFrame
      header={
        <div className="px-4 py-3 flex items-center justify-between">
           <h1 className="text-lg font-bold text-gray-900">{getTitle()}</h1>
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
             <Menu size={20} />
           </button>
        </div>
      }
      footer={
        <nav className="flex justify-around items-center h-full">
          <button 
            onClick={() => setActiveTab(AppTab.MEMBERSHIP)}
            className={`flex flex-col items-center gap-1 ${activeTab === AppTab.MEMBERSHIP ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <User size={24} strokeWidth={activeTab === AppTab.MEMBERSHIP ? 2.5 : 2} />
            <span className="text-[10px] font-medium">会员</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(AppTab.MARKETING)}
            className={`flex flex-col items-center gap-1 ${activeTab === AppTab.MARKETING ? 'text-red-500' : 'text-gray-400'}`}
          >
            <Gift size={24} strokeWidth={activeTab === AppTab.MARKETING ? 2.5 : 2} />
            <span className="text-[10px] font-medium">权益</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(AppTab.DISTRIBUTION)}
            className={`flex flex-col items-center gap-1 ${activeTab === AppTab.DISTRIBUTION ? 'text-indigo-600' : 'text-gray-400'}`}
          >
            <Share2 size={24} strokeWidth={activeTab === AppTab.DISTRIBUTION ? 2.5 : 2} />
            <span className="text-[10px] font-medium">分销</span>
          </button>
        </nav>
      }
    >
      {renderContent()}
    </MobileFrame>
  );
};

export default App;