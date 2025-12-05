import React from 'react';
import { Users, TrendingUp, UserPlus, ArrowDown } from 'lucide-react';
import { DistributionNode } from '../types';

export const DistributionView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Users size={12} /> 团队规模
                </p>
                <p className="text-2xl font-bold text-gray-800">1,240</p>
                <p className="text-[10px] text-green-500">本周 +12%</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <TrendingUp size={12} /> 佣金
                </p>
                <p className="text-2xl font-bold text-gray-800">¥8,450</p>
                <p className="text-[10px] text-gray-400">可提现金额</p>
            </div>
        </div>

        {/* Upgrade Logic Visualizer */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold">下一等级：大团长</h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">等级 2</span>
            </div>
            <div className="relative pt-2 pb-6">
                <div className="flex justify-between text-xs text-blue-100 mb-2">
                    <span>当前：小团长</span>
                    <span>目标：邀请 50 人</span>
                </div>
                <div className="h-2 bg-blue-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-300 w-[75%] rounded-full"></div>
                </div>
                <p className="text-[10px] mt-2 text-blue-200">
                    达到 50 人邀请即可自动升级并增加 5% 佣金。
                </p>
            </div>
        </div>

        {/* Tree Visualization */}
        <div className="space-y-4">
            <h3 className="font-bold text-gray-800 px-1">关系图谱</h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center shadow-sm">
                
                {/* Node A */}
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center text-orange-600 font-bold text-lg mb-1 relative">
                        A
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">大团长</span>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                </div>

                <div className="flex justify-center gap-12 w-full relative">
                     {/* Connector Horizontal */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gray-300"></div>

                     {/* Node B */}
                     <div className="flex flex-col items-center relative">
                        <div className="h-4 w-px bg-gray-300 absolute -top-4"></div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold mb-1">
                            B
                        </div>
                        <span className="text-[10px] text-gray-400">小团长</span>
                        
                        <div className="h-4 w-px bg-gray-300 mt-1"></div>
                        <ArrowDown size={10} className="text-gray-300" />
                         {/* Node C */}
                         <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 text-xs font-bold mt-1">
                            C
                        </div>
                        <span className="text-[8px] text-gray-400 mt-1">分享员</span>
                     </div>

                     {/* Other Branch */}
                     <div className="flex flex-col items-center relative">
                        <div className="h-4 w-px bg-gray-300 absolute -top-4"></div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                            <UserPlus size={16} />
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1">邀请</span>
                     </div>
                </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
                A 邀请 B，B 邀请 C，A 可获得 C 的级差佣金。
            </p>
        </div>
    </div>
  );
};