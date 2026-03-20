"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Plus, CheckCircle2, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState, useMemo } from "react";

const ACCOUNTS = [
  {
    id: "fb-page",
    name: "Facebook Page",
    platform: "meta",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
  },
  {
    id: "li-page",
    name: "LinkedIn Page",
    platform: "linkedin",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    id: "tw-page",
    name: "Twitter (X) Page",
    platform: "twitter",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    comingSoon: true,
  },
  {
    id: "gmb-page",
    name: "Google Business Profile",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
  },
  {
    id: "ig-page",
    name: "Instagram Page",
    platform: "meta",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  },
  {
    id: "pin-page",
    name: "Pinterest Page",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
  },
];

export default function ConnectAccounts() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  const fetchAccounts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("accounts")
      .select("platform")
      .eq("user_id", user.id);

    if (data && !error) {
      setConnectedPlatforms(data.map((a: any) => a.platform));
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleConnect = (platform?: string) => {
    if (platform === "twitter") return;

    if (connectedPlatforms.includes(platform as string)) return;

    if (platform) {
      window.location.href = `/api/auth/${platform}`;
    }
  };

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
                (() => {
                  const isComingSoon = account.comingSoon === true;
                  const isConnected = !isComingSoon && connectedPlatforms.includes(account.platform as string);
                  return (
                <motion.div
                  key={account.id}
                  onClick={() => {
                    if (!isComingSoon) handleConnect(account.platform);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (!isComingSoon) handleConnect(account.platform);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.05 * i, 
                    duration: 0.25, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  whileHover={isComingSoon ? undefined : { y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex flex-col items-start p-6 bg-white border border-slate-200 rounded-2xl transition-all duration-200 text-left overflow-hidden before:absolute before:inset-0 before:bg-slate-50/50 before:opacity-0 before:transition-opacity before:z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ${isComingSoon ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:before:opacity-100"}`}
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
                    
                    {/* Connection Indicator */}
                    <div className="pt-1">
                      {isComingSoon ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-full border border-amber-100"
                        >
                          <Clock3 className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">Soon</span>
                        </motion.div>
                      ) : isConnected ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full border border-green-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
                          <span className="text-[10px] font-bold text-green-600 uppercase tracking-tight">Verified</span>
                        </motion.div>
                      ) : (
                        <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
                          <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-start gap-1">
                    <span className="text-[14px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                      {account.name}
                    </span>
                    {isComingSoon ? (
                      <span className="text-[11px] text-amber-700 font-medium">Coming Soon</span>
                    ) : isConnected ? (
                      <div className="flex flex-col items-start">
                        <span className="text-[11px] text-slate-400">Connected</span>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
                  );
                })()
              ))}
            </div>

          </div>
        </main>
      </div>
    </MotionWrapper>
  );
}
