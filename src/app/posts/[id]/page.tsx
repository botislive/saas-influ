"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { X, Download } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";

const REACH_DATA = [
  { name: "Aug 01", reach: 2.7, impressions: 1.9 },
  { name: "Aug 07", reach: 2.6, impressions: 1.3 },
  { name: "Aug 14", reach: 2.2, impressions: 1.6 },
  { name: "Aug 21", reach: 2.9, impressions: 1.1 },
  { name: "Aug 28", reach: 2.8, impressions: 1.1 },
  { name: "Sep 03", reach: 3.0, impressions: 1.5 },
  { name: "Sep 10", reach: 3.0, impressions: 1.5 },
  { name: "Sep 17", reach: 2.3, impressions: 1.5 },
  { name: "Sep 24", reach: 2.1, impressions: 1.5 },
  { name: "Oct 01", reach: 3.2, impressions: 2.0 },
  { name: "Oct 08", reach: 3.8, impressions: 2.2 },
  { name: "Oct 15", reach: 3.1, impressions: 1.7 },
  { name: "Oct 22", reach: 3.0, impressions: 1.6 },
];

const ENGAGEMENT_DATA = [
  { name: "Aug 01", value: 1.8 },
  { name: "Aug 07", value: 1.8 },
  { name: "Aug 14", value: 2.1 },
  { name: "Aug 21", value: 2.4 },
  { name: "Aug 28", value: 2.1 },
  { name: "Sep 03", value: 1.9 },
  { name: "Sep 10", value: 2.0 },
  { name: "Sep 17", value: 2.1 },
  { name: "Sep 24", value: 2.6 },
  { name: "Oct 01", value: 2.6 },
  { name: "Oct 08", value: 3.6 },
  { name: "Oct 15", value: 3.8 },
  { name: "Oct 22", value: 3.3 },
  { name: "Oct 29", value: 3.2 },
];

export default function PostDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Likes");

  return (
    <MotionWrapper>
      <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden antialiased">
        <Sidebar />
        <Navbar />

        <main className="flex-1 ml-[280px] mt-20 p-8 lg:p-12 relative z-10 transition-all flex justify-center items-start">
          <div className="w-full max-w-[1280px] bg-white rounded-[32px] p-8 lg:p-10 shadow-sm border border-slate-200/60 flex flex-col gap-10 reveal relative mt-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-4 h-8 bg-indigo-300 rounded-sm" />
                <h1 className="text-[24px] font-bold tracking-tight text-slate-900">
                  Post Performance Details
                </h1>
              </div>
              <button 
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors border border-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Post Content */}
              <div className="lg:col-span-4 flex min-h-full flex-col gap-6">
                {/* Text Content */}
                <div className="flex-1 space-y-5">
                  <p className="text-[15px] leading-[1.6] text-slate-800 tracking-[-0.01em]">
                    <strong>Hello Folks👋</strong><br/>
                    -<br/>
                    We are exploring some of the widgets. It's a Part Of our UI KIT that we are working on for a few months. We will release it soon.<br/>
                    <br/>
                    Show us love...🖤<br/>
                    -<br/>
                    More cool projects are coming soon, Remember to follow us!
                  </p>
                  <p className="text-[14px] leading-[1.6] text-slate-500 font-medium">
                    #ui #ux #uidesigner #uxdesigner #webdesign #appdesign #webui #appui #interface #design #userinterface #inspiration #Dribbble #Behance #adobeXD #figma #sketch #interfacely #uxswipe #uxbuzz #uxbucket #uixnerd #uiuxbunke
                  </p>
                  <p className="text-[12px] text-slate-400 font-medium uppercase tracking-wider pt-2">
                    Posted on 9 Mar, 2023 - 11:30 AM
                  </p>
                </div>

                {/* Download Btn */}
                <div className="mt-auto pt-6">
                  <Button variant="secondary" className="h-11 w-full rounded-full border-slate-200 bg-slate-50 px-4 text-[13px] font-medium tracking-[0.01em] text-slate-700 shadow-none transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-slate-300 hover:bg-white hover:text-slate-900 active:scale-[0.98]">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      <Download className="h-4 w-4 text-slate-500 transition-colors" />
                      Download Report
                    </span>
                  </Button>
                </div>

              </div>

              {/* Right Column: Statistics */}
              <div className="lg:col-span-8 flex flex-col gap-10">
                
                {/* Top Metrics Row */}
                <div className="flex items-center gap-16 pb-8 border-b border-slate-100">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-[16px] font-bold text-slate-800">Engagements</h3>
                    <div className="flex items-center gap-6">
                      <span className="text-[32px] font-bold text-slate-900 leading-none">52%</span>
                      <div className="flex-1 h-4 bg-slate-100 rounded-sm overflow-hidden flex">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "52%" }}
                           transition={{ duration: 1, ease: "easeOut" }}
                           className="h-full bg-blue-600 rounded-sm" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-[1px] bg-slate-100 h-16" />
                  
                  <div className="flex-1 space-y-4">
                    <h3 className="text-[16px] font-bold text-slate-800">Followers</h3>
                    <div className="flex items-center justify-between pr-4">
                      <span className="text-[32px] font-bold text-slate-900 leading-none">52%</span>
                      <div className="flex items-end gap-1.5 h-10 w-24">
                        {[20, 30, 40, 25, 80, 45].map((v, i) => (
                           <div key={i} className="w-full bg-slate-100 rounded-t-sm relative overflow-hidden" style={{ height: '100%' }}>
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${v}%` }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                className="absolute bottom-0 w-full rounded-t-sm"
                                style={{ backgroundColor: v === 80 ? '#2563EB' : '#E2E8F0' }}
                              />
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reach & Impressions Chart */}
                <div className="space-y-8 h-[300px] flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[18px] font-bold text-slate-800 tracking-tight">Rich & Impressions</h3>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-[#FDA4AF]" />
                        <span className="text-[13px] font-semibold text-slate-500">Reach</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-[#A855F7]" />
                        <span className="text-[13px] font-semibold text-slate-500">Impressions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REACH_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FDA4AF" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#FDA4AF" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A855F7" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                          domain={[0, 4]} 
                          tickCount={5}
                          tickFormatter={(val) => val.toFixed(2)}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}
                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="reach" 
                          stroke="#FDA4AF" 
                          strokeWidth={2.5}
                          fillOpacity={1} 
                          fill="url(#colorReach)" 
                          activeDot={{ r: 5, fill: '#FDA4AF', stroke: '#fff', strokeWidth: 2 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="impressions" 
                          stroke="#A855F7" 
                          strokeWidth={2.5}
                          fillOpacity={1} 
                          fill="url(#colorImpressions)" 
                          activeDot={{ r: 5, fill: '#A855F7', stroke: '#fff', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-slate-100 my-2" />

                {/* Tabs & Single Area Chart */}
                <div className="space-y-8 h-[300px] flex flex-col">
                  <div className="flex gap-2.5">
                    {["Likes", "Comments", "Sends", "Saves"].map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 border ${
                          activeTab === tab 
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 active:scale-[0.98]" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 active:scale-[0.98]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 w-full -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ENGAGEMENT_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                          dy={10}
                          interval={2}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                          domain={[0, 4]} 
                          tickCount={5}
                          tickFormatter={(val) => val.toFixed(2)}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}
                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8B5CF6" 
                          strokeWidth={2.5}
                          fillOpacity={1} 
                          fill="url(#colorEngagement)" 
                          activeDot={{ r: 5, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </MotionWrapper>
  );
}
