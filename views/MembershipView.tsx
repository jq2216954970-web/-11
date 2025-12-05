import React, { useState } from 'react';
import { Crown, Gift, Truck, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { BenefitStatus } from '../types';

export const MembershipView: React.FC = () => {
  const [benefitStep, setBenefitStep] = useState(1); // 0 to 3

  const benefits: BenefitStatus = {
    step: benefitStep,
    itemName: "高级咖啡套装"
  };

  const progressSteps = [
    { label: "已领取", icon: Gift },
    { label: "已发货", icon: Truck },
    { label: "已送达", icon: CheckCircle },
    { label: "已核销", icon: Crown },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Digital Member Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-gold shadow-lg h-48 p-6 flex flex-col justify-between">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500 opacity-20 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
              <Crown className="w-6 h-6" /> VIP 会员
            </h2>
            <p className="text-gray-400 text-sm mt-1">ID: 8839-1203</p>
          </div>
          <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500/30">
            活跃
          </span>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">余额</p>
            <p className="text-3xl font-bold text-white">2,450 <span className="text-sm font-normal text-gray-400">积分</span></p>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-full text-sm transition-colors">
            续费
          </button>
        </div>
      </div>

      {/* Welfare/Benefit Tracker */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
          <span>每月权益状态</span>
          <span className="text-xs text-blue-600 font-normal bg-blue-50 px-2 py-1 rounded-full">{benefits.itemName}</span>
        </h3>
        
        <div className="relative flex justify-between items-center mb-2">
           {/* Progress Line */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0"></div>
           <div 
            className="absolute top-1/2 left-0 h-1 bg-green-500 transition-all duration-500 -z-0"
            style={{ width: `${(benefitStep / (progressSteps.length - 1)) * 100}%` }}
           ></div>

           {progressSteps.map((step, idx) => {
             const Icon = step.icon;
             const isActive = idx <= benefitStep;
             return (
               <div key={idx} className="relative z-10 flex flex-col items-center gap-2" onClick={() => setBenefitStep(idx)}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                   <Icon size={14} />
                 </div>
                 <span className={`text-[10px] ${isActive ? 'text-green-600 font-medium' : 'text-gray-400'}`}>{step.label}</span>
               </div>
             );
           })}
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center bg-gray-50 p-2 rounded">
          点击上方图标模拟状态更新 (原型演示)
        </p>
      </div>

      {/* Exclusive Discounts */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 px-1">专属折扣</h3>
        {[
          { name: "耐克品牌", offer: "8折", type: "品牌" },
          { name: "电子产品", offer: "50元券", type: "品类" },
          { name: "有机套装", offer: "买一送一", type: "单品" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-indigo-500">{item.type} 专享</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-500">{item.offer}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};