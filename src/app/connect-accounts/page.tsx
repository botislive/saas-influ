"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const ACCOUNTS = [
  {
    id: "fb-page",
    name: "Facebook Page",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
  },
  {
    id: "li-page",
    name: "Facebook Page", // Intentional duplicate based on screenshot visually
    realName: "LinkedIn Page",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    id: "tw-page",
    name: "Facebook Page", // Intentional duplicate based on screenshot visually
    realName: "Twitter Page",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
  },
  {
    id: "gmb-page",
    name: "Google Business Profile",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
  },
  {
    id: "ig-page",
    name: "Instagram Page",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  },
  {
    id: "pin-page",
    name: "Pinterest Page",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
  },
];

export default function ConnectAccounts() {
  return (
    <MotionWrapper>
      <div className="flex min-h-screen bg-[#F8FAFC] text-text-primary overflow-x-hidden antialiased">
        <Sidebar />
        <Navbar />

        <main className="flex-1 ml-[280px] mt-20 p-8 lg:p-12 relative z-10 transition-all flex justify-center items-start">
          <div className="w-full max-w-[1024px] space-y-12 reveal mt-12 bg-white rounded-[32px] p-12 lg:p-16 shadow-sm border border-slate-200/60">
            
            {/* Header Section */}
            <div className="space-y-3 pb-8">
              <h1 className="text-[36px] font-bold tracking-tight text-slate-900 leading-[1.2]">
                Add Your Profile
              </h1>
              <p className="text-[16px] text-slate-500 leading-[1.6]">
                Choose a social profile you'd like to manage.
              </p>
            </div>

            {/* Grid Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACCOUNTS.map((account, i) => (
                <motion.button
                  key={account.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.05 * i, 
                    duration: 0.25, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex flex-col items-start p-6 bg-white border border-slate-200 rounded-2xl transition-all duration-200 text-left overflow-hidden before:absolute before:inset-0 before:bg-slate-50/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:z-0"
                >
                  <div className="relative z-10 flex justify-between items-start w-full mb-8">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent shrink-0">
                      {/* Using safe fallback for icons to look nice */}
                      <img 
                        src={account.icon} 
                        alt={account.name} 
                        className="w-full h-full object-contain drop-shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${account.name}&background=random&color=fff&rounded=true&bold=true`;
                        }}
                      />
                    </div>
                    
                    {/* Plus Icon - matching screenshot */}
                    <div className="text-slate-400 group-hover:text-slate-900 transition-colors pt-1">
                      <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <span className="relative z-10 text-[14px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    {account.realName || account.name}
                  </span>
                </motion.button>
              ))}
            </div>

          </div>
        </main>
      </div>
    </MotionWrapper>
  );
}
