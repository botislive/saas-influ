"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/dashboard/StatCard";
import { AudienceChart } from "@/components/dashboard/AudienceChart";
import { GenderChart } from "@/components/dashboard/GenderChart";
import { PostPerformanceTable } from "@/components/dashboard/PostPerformanceTable";
import { Users, Eye, Handshake, DollarSign, MapPin, Search as SearchIcon, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);

        // Fetch stats
        const { data: statsData } = await supabase
          .from('stats')
          .select('*')
          .eq('profile_id', profileData.id);
        
        if (statsData) setStats(statsData);
      }

      // Subscribe to real-time changes for stats
      const statsSubscription = supabase
        .channel('stats-changes')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'stats' }, (payload) => {
          setStats((currentStats) => 
            currentStats.map(stat => stat.id === payload.new.id ? payload.new : stat)
          );
        })
        .subscribe();

      return () => {
        supabase.removeChannel(statsSubscription);
      };
    }

    fetchData();
  }, [user]);

  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  const getStat = (type: string) => stats.find(s => s.type === type) || {};

  return (
    <MotionWrapper>
    <div className="flex min-h-screen bg-background-primary overflow-x-hidden">
      <Sidebar />
      <Navbar />

      <main className="flex-1 ml-[280px] mt-16 p-8 relative z-10 grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left/Middle Column (3/4 of space) */}
        <div className="xl:col-span-3 space-y-8">
          
          <section className="flex flex-col gap-1 reveal">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-1">Dashboard Overview</h2>
            <p className="text-text-secondary text-base">Welcome back, {userName.split(' ')[0]}. Here's what's happening with your profiles today.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 reveal">
            <StatCard 
              title="Total Followers" 
              value={getStat('followers').value || "12,567"} 
              change={getStat('followers').change || "+12.5%"} 
              trend={getStat('followers').trend || "up"} 
              icon={<Users className="h-5 w-5" />}
              chartColor="#10B981"
              progress={getStat('followers').progress || 38}
            />
            <StatCard 
              title="Total Impressions" 
              value={getStat('impressions').value || "24K"} 
              change={getStat('impressions').change || "+8.2%"} 
              trend={getStat('impressions').trend || "up"} 
              icon={<Eye className="h-5 w-5" />}
              chartColor="#0ea5e9"
              progress={getStat('impressions').progress || 62}
            />
            <StatCard 
              title="Active Partnerships" 
              value={getStat('partnerships').value || "18"} 
              change={getStat('partnerships').change || "-2.4%"} 
              trend={getStat('partnerships').trend || "down"} 
              icon={<Handshake className="h-5 w-5" />}
              chartColor="#eab308"
              progress={getStat('partnerships').progress || 80}
            />
            <StatCard 
              title="Total Earnings" 
              value={getStat('earnings').value || "$12,450"} 
              change={getStat('earnings').change || "+15.3%"} 
              trend={getStat('earnings').trend || "up"} 
              icon={<DollarSign className="h-5 w-5" />}
              chartColor="#10B981"
              progress={getStat('earnings').progress || 85}
            />
          </section>

          {/* Grid Level 2: Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal">
            <AudienceChart />
            <GenderChart />
          </section>

          {/* Grid Level 3: Table */}
          <div className="reveal">
            <PostPerformanceTable />
          </div>
        </div>

        {/* Right Column (1/4 of space) for Sidebar Content */}
        <aside className="space-y-8 hidden xl:block reveal">
           <div className="bg-surface-elevated/50 border border-black/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center">
               <div className="h-32 w-32 rounded-full border-4 border-accent-primary p-1 mb-6 relative overflow-hidden">
                <img src={profile?.avatar_url || user?.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user?.id || 'stephanie'}`} alt="Profile" className="h-full w-full rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{profile?.full_name || user?.user_metadata?.full_name || userName}</h3>
              <p className="text-text-tertiary text-sm mb-6">@{profile?.username || user?.email?.split('@')[0] || "user"}</p>
              
              <div className="flex gap-3 mb-8">
                <a href={profile?.facebook_url || "#"} className="h-8 w-8 rounded-full bg-surface-interactive flex items-center justify-center text-text-secondary hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-all">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href={profile?.twitter_url || "#"} className="h-8 w-8 rounded-full bg-surface-interactive flex items-center justify-center text-text-secondary hover:text-[#000000] hover:bg-black/5 transition-all">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href={profile?.instagram_url || "#"} className="h-8 w-8 rounded-full bg-surface-interactive flex items-center justify-center text-text-secondary hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={profile?.linkedin_url || "#"} className="h-8 w-8 rounded-full bg-surface-interactive flex items-center justify-center text-text-secondary hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>

              <div className="w-full space-y-6 pt-6 border-t border-black/5">
                <Button className="w-full py-4 text-xs tracking-widest uppercase bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-md hover:shadow-lg border border-black/10">
                  Analyze Profile
                </Button>
                
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-text-primary">Top Countries</h4>
                  <span className="text-[10px] text-text-tertiary uppercase">Sort By</span>
                </div>
                
                {/* Simulated Country List */}
                {[
                  { name: "USA", val: 1175, code: "us" },
                  { name: "UK", val: 965, code: "gb" },
                  { name: "HUN", val: 863, code: "hu" },
                ].map(country => (
                  <div key={country.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full overflow-hidden border border-black/10 bg-surface-interactive">
                        <img src={`https://flagcdn.com/w40/${country.code}.png`} alt={country.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{country.name}</span>
                    </div>
                    <span className="text-sm font-mono text-text-primary">{country.val}</span>
                  </div>
                ))}
              </div>
           </div>
        </aside>
      </main>
    </div>
    </MotionWrapper>
  );
}
