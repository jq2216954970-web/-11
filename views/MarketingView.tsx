import React, { useState, useEffect, useRef } from 'react';
import { Gift, Play, RotateCw, Ticket, Sparkles, Timer, Check } from 'lucide-react';
import { generateMarketingCopy } from '../services/geminiService';

export const MarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wheel' | 'watch' | 'coupons'>('wheel');
  
  return (
    <div className="flex flex-col h-full">
      {/* Sub-nav */}
      <div className="flex border-b border-gray-100 bg-white sticky top-0 z-20">
        <button 
          onClick={() => setActiveTab('wheel')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'wheel' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
        >
          幸运大转盘
        </button>
        <button 
          onClick={() => setActiveTab('watch')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'watch' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
        >
          看视频赚积分
        </button>
        <button 
          onClick={() => setActiveTab('coupons')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'coupons' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
        >
          领券中心
        </button>
      </div>

      <div className="p-4 flex-1">
        {activeTab === 'wheel' && <LuckyWheel />}
        {activeTab === 'watch' && <WatchAndEarn />}
        {activeTab === 'coupons' && <CouponCenter />}
      </div>
    </div>
  );
};

// --- Sub Components ---

const LuckyWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrize(null);
    
    // Random spin between 3 to 6 full rotations + random segment
    const randomDeg = Math.floor(Math.random() * 360) + 1080; 
    setRotation(rotation + randomDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setPrize("100 积分");
    }, 3000); // 3s CSS transition
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Sparkles className="text-yellow-500" /> 每日抽奖
      </h2>
      
      <div className="relative w-64 h-64 mb-8">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 text-red-600">
           <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[20px] border-t-red-600 border-r-[10px] border-r-transparent"></div>
        </div>

        {/* Wheel */}
        <div 
          className="w-full h-full rounded-full border-4 border-yellow-400 shadow-xl overflow-hidden relative transition-transform duration-[3000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 relative">
             {/* Simple visual segments */}
             <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white opacity-30"></div>
             <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white opacity-30"></div>
             <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white opacity-30 transform rotate-45"></div>
             <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white opacity-30 transform -rotate-45"></div>
          </div>
        </div>

        {/* Center Button */}
        <button 
          onClick={spin}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-red-500 border-4 border-red-100 z-10 active:scale-95 transition-transform"
        >
          {isSpinning ? '...' : '抽'}
        </button>
      </div>

      {prize && (
        <div className="animate-bounce bg-yellow-100 text-yellow-800 px-6 py-2 rounded-full font-bold border border-yellow-200">
          🎉 恭喜获得: {prize}!
        </div>
      )}
    </div>
  );
};

const WatchAndEarn: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION = 100; // 100 ticks

  useEffect(() => {
    if (isPlaying && progress < DURATION) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
            if (p >= DURATION) {
                if(timerRef.current) clearInterval(timerRef.current);
                return DURATION;
            }
            return p + 1;
        });
      }, 50); // Fast simulation
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if(timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, progress]);

  return (
    <div className="space-y-6">
       <div className="bg-black rounded-xl aspect-video relative overflow-hidden group flex items-center justify-center">
          {/* Simulated Video Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-80"></div>
          
          {!isPlaying && progress < DURATION && (
             <button onClick={() => setIsPlaying(true)} className="relative z-10 bg-white/20 hover:bg-white/30 p-4 rounded-full backdrop-blur-sm transition-all">
                <Play className="text-white w-8 h-8 fill-current pl-1" />
             </button>
          )}

          {/* Progress Indicator Overlay */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
             <Timer size={14} className="text-yellow-400" />
             <span className="text-white text-xs font-mono">
                {progress >= DURATION ? '完成' : `${Math.floor((progress/DURATION)*100)}%`}
             </span>
          </div>
          
          <div className="absolute bottom-0 left-0 h-1 bg-gray-700 w-full">
             <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(progress/DURATION)*100}%` }}></div>
          </div>
       </div>

       <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
         <h3 className="font-bold text-gray-800 mb-2">观看视频赚印章</h3>
         <p className="text-sm text-gray-500 mb-4">完整观看视频以收集每日印章和积分。</p>
         
         {progress >= DURATION ? (
             <button 
                onClick={() => setClaimed(true)}
                disabled={claimed}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${claimed ? 'bg-green-100 text-green-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
             >
                {claimed ? <><Check size={18} /> 已领取</> : '领取 50 积分'}
             </button>
         ) : (
             <div className="text-center text-sm text-gray-400 py-2">
                观看中...
             </div>
         )}
       </div>
    </div>
  );
};

const CouponCenter: React.FC = () => {
    const [aiSlogan, setAiSlogan] = useState<string>("");
    const [generating, setGenerating] = useState(false);

    const handleAiGenerate = async () => {
        setGenerating(true);
        const slogan = await generateMarketingCopy("周末特惠", "美妆护肤");
        setAiSlogan(slogan);
        setGenerating(false);
    };

    return (
        <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-xl text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Gift className="w-5 h-5" /> 新人大礼包
                    </h3>
                    <p className="text-pink-100 text-sm mt-1">老用户邀请新用户解锁专属阶梯奖励。</p>
                    <div className="mt-4 flex gap-2">
                        <button className="bg-white text-pink-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow">分享链接</button>
                        <button className="bg-pink-600 border border-white/30 px-3 py-1.5 rounded-lg text-xs font-bold">扫码</button>
                    </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            </div>

            <h3 className="font-bold text-gray-800 pt-2">可用优惠券</h3>
            
            {/* AI Integration Demo */}
            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                    <p className="text-xs font-bold text-indigo-800 uppercase mb-1">AI 助手</p>
                    <p className="text-sm text-indigo-700 italic">
                        {aiSlogan || "点击按钮生成吸引人的优惠券文案..."}
                    </p>
                    <button 
                        onClick={handleAiGenerate}
                        disabled={generating}
                        className="mt-2 text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
                    >
                        {generating ? '生成中...' : '生成文案'}
                    </button>
                </div>
            </div>

            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-lg p-3 flex shadow-sm relative overflow-hidden">
                    <div className="border-r-2 border-dashed border-gray-200 pr-4 flex flex-col justify-center items-center w-24">
                        <span className="text-2xl font-bold text-red-500">¥50</span>
                        <span className="text-[10px] text-gray-400">满 200可用</span>
                    </div>
                    <div className="pl-4 flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-gray-800">全场通用券</h4>
                        <p className="text-xs text-gray-500 mt-1">3天后过期</p>
                    </div>
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-50 rounded-full"></div>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-50 rounded-full"></div>
                </div>
            ))}
        </div>
    );
};