"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MotionWrapper } from "@/components/MotionWrapper";
import { 
  Search, 
  MoreVertical, 
  ListFilter,
  BarChart2,
  Download,
  Copy,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const POSTS_DATA = [
  {
    id: "P4092024",
    title: "Product Launch Video",
    platform: "Instagram",
    author: "Easton",
    authorAvatar: "https://i.pravatar.cc/150?u=1",
    price: "IG", // using platform symbol
    revenue: "2,300", // Likes/Engagement
    sales: "230", // Comments
    stock: "45", // Shares
    rating: 5,
    status: "Published",
    selected: false,
  },
  {
    id: "W4092024",
    title: "10 Tips for Finance",
    platform: "Twitter",
    author: "Easton",
    authorAvatar: "https://i.pravatar.cc/150?u=2",
    price: "TW",
    revenue: "4,500",
    sales: "130",
    stock: "1,000",
    rating: 4,
    status: "Scheduled",
  },
  {
    id: "B4092012",
    title: "Weekly Newsletter Promo",
    platform: "LinkedIn",
    author: "Easton",
    authorAvatar: "https://i.pravatar.cc/150?u=3",
    price: "IN",
    revenue: "1,200",
    sales: "210",
    stock: "870",
    rating: 5,
    status: "Draft",
  },
  {
    id: "P4092025",
    title: "Behind the Scenes Q&A",
    platform: "Instagram",
    author: "Easton",
    authorAvatar: "https://i.pravatar.cc/150?u=1",
    price: "IG",
    revenue: "8,900",
    sales: "170",
    stock: "1,300",
    rating: 5,
    status: "Scheduled",
  },
  {
    id: "L4092023",
    title: "Market Analysis Q3",
    platform: "LinkedIn",
    author: "Easton",
    authorAvatar: "https://i.pravatar.cc/150?u=3",
    price: "IN",
    revenue: "15,200",
    sales: "102",
    stock: "800",
    rating: 5,
    status: "Published",
  },
];

const MINI_CHART_DATA = [
  { val: 40 }, { val: 60 }, { val: 20 }, { val: 80 }, { val: 50 }, { val: 90 }, { val: 30 }
];

export default function AllPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState(POSTS_DATA);
  const selectedCount = posts.filter(p => p.selected).length;
  const isAllSelected = posts.length > 0 && selectedCount === posts.length;

  const toggleAll = () => {
    setPosts(posts.map(p => ({ ...p, selected: !isAllSelected })));
  };

  const toggleSelect = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  return (
    <MotionWrapper>
      <div className="flex min-h-screen overflow-x-hidden bg-slate-50 text-text-primary antialiased subpixel-antialiased">
        <Sidebar />
        <Navbar />

        <main className="relative z-10 mt-20 ml-[280px] flex-1 p-6 transition-all lg:p-8">
          <div className="mx-auto w-full max-w-[1440px] space-y-8 reveal">
            
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-[-0.02em] text-slate-900">Posts</h1>
              <p className="mt-2 max-w-prose text-sm text-slate-500">
                Manage and track your social media posts effortlessly.
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <Button className="h-11 rounded-full bg-slate-900 px-5 text-sm font-semibold tracking-[0.01em] text-white shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-800 active:scale-[0.98]">
                Post +
              </Button>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <Search className="w-[18px] h-[18px] text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-44 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-48"
                  />
                  <div className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-500">⌘1</div>
                </div>

                <div className="flex h-11 items-center rounded-full border border-slate-200 bg-white px-2 shadow-sm">
                  <button className="flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]">
                    <ListFilter className="h-4 w-4" />
                    Filter
                  </button>
                  <span className="mx-1 h-4 w-px bg-slate-200" />
                  <button className="flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]">
                    <BarChart2 className="h-4 w-4" />
                    Stats
                  </button>
                  <span className="mx-1 h-4 w-px bg-slate-200" />
                  <button className="flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Total Posts", val: "201", diff: "+12 posts", color: "#10B981", active: true },
                { title: "Total Impressions", val: "20,432", diff: "+5%", color: "#F97316" },
                { title: "Avg. Engagement", val: "3,899", diff: "+2%", color: "#0F172A" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.04),transparent_55%)]" />
                  <div className="relative mb-6 flex items-center justify-between">
                    <span className="text-[15px] font-medium text-slate-600">{stat.title}</span>
                    <button className="rounded-lg p-1 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="relative flex items-end justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-3 text-[32px] font-bold tracking-[-0.02em] text-slate-900">
                        {stat.val}
                        <span className="flex items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                          {stat.diff}
                        </span>
                      </div>
                      <span className="text-[13px] text-slate-400">Compared to last week</span>
                    </div>
                    
                    {/* Tiny Bar Chart */}
                    <div className="flex items-end gap-1.5 h-12 w-24">
                      {MINI_CHART_DATA.map((d, idx) => {
                        const isPrimaryBar = stat.active && (idx === 4 || idx === 5); // Just some variation
                        return (
                          <div key={idx} className="w-full bg-slate-100 rounded-t-sm relative overflow-hidden" style={{ height: '100%' }}>
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${d.val}%` }}
                              transition={{ delay: 0.05 * idx, duration: 0.6, ease: "easeOut" }}
                              className="absolute bottom-0 w-full rounded-t-sm"
                              style={{ backgroundColor: isPrimaryBar ? stat.color : stat.active ? '#A7F3D0' : stat.color === '#F97316' && (idx===5 || idx===6) ? '#F97316' : stat.color === '#F97316' ? '#FFEDD5' : '#E2E8F0' }}
                            />
                          </div>
                      )})}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Table Container */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500 w-16">
                          <button 
                            onClick={toggleAll}
                            className={`flex h-[18px] w-[18px] items-center justify-center rounded border transition-all duration-200 ${isAllSelected ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm' : 'border-slate-300 bg-white hover:border-slate-400'}`}
                          >
                            {isAllSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Post</th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Post ID</th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Platform</th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Likes / Views</th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Comments</th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Shares</th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Rating</th>
                        <th className="px-6 py-5 font-semibold text-[13px] text-slate-500">Status</th>
                        <th className="px-6 py-5 w-16"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {posts.length > 0 ? posts.map((post) => (
                        <tr 
                         key={post.id} 
                         className={`group transition-colors duration-200 hover:bg-slate-50/80 ${post.selected ? 'bg-indigo-50/30' : ''}`}
                        >
                          <td className="px-6 py-5 align-middle">
                            <button 
                                onClick={() => toggleSelect(post.id)}
                                className={`flex h-[18px] w-[18px] items-center justify-center rounded border transition-all duration-200 ${post.selected ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}
                            >
                                {post.selected && <Check className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                          <td className="px-6 py-5 align-middle">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 shadow-sm bg-slate-100">
                                <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span onClick={() => router.push(`/posts/${post.id}`)} className="font-semibold text-slate-900 text-[15px] truncate mb-0.5 cursor-pointer hover:text-indigo-600 transition-colors">{post.title}</span>
                                <span className="text-[13px] text-slate-500 truncate">{post.platform} • {post.author}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 align-middle text-[14px] text-slate-500 font-mono">{post.id}</td>
                          <td className="px-6 py-5 align-middle font-semibold text-slate-900 text-[14px]">{post.price}</td>
                          <td className="px-6 py-5 align-middle text-[14px] text-slate-600">{post.revenue}</td>
                          <td className="px-6 py-5 align-middle text-[14px] text-slate-600">{post.sales}</td>
                          <td className="px-6 py-5 align-middle text-[14px] text-slate-600">{post.stock}</td>
                          <td className="px-6 py-5 align-middle">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-slate-700 text-[14px] mr-1">{post.rating}.0</span>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < post.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-5 align-middle">
                            <Badge 
                              variant={post.status === "Published" ? "success" : post.status === "Scheduled" ? "neutral" : "warning"} 
                              className="text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm border border-black/5"
                            >
                              {post.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-5 align-middle text-right">
                            <button className="rounded-lg p-1.5 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700">
                              <MoreVertical className="w-[18px] h-[18px]" />
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={10} className="px-6 py-16 text-center">
                            <div className="mx-auto max-w-prose rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10">
                              <p className="text-base font-semibold text-slate-900">No posts yet</p>
                              <p className="mt-2 text-sm text-slate-500">
                                Create your first post to start tracking impressions, engagement, and publishing status.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4">
                    <span className="text-[14px] text-slate-500">Showing <strong className="font-semibold text-slate-900">1-5</strong> of 12 entries</span>
                    <div className="flex items-center gap-2">
                        <button className="flex h-9 items-center gap-1 rounded-full border border-slate-200 px-3 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]">
                            <ChevronLeft className="h-4 w-4" />
                            Prev
                        </button>
                        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-medium text-slate-500">
                          Page <span className="font-semibold text-slate-900">1</span> of 12
                        </div>
                        <button className="flex h-9 items-center gap-1 rounded-full border border-slate-200 px-3 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]">
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Floating Actions */}
                <AnimatePresence>
                    {selectedCount > 0 && (
                        <motion.div 
                        initial={{ y: 50, opacity: 0, x: "-50%", scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, x: "-50%", scale: 1 }}
                        exit={{ y: 50, opacity: 0, x: "-50%", scale: 0.95 }}
                        className="pointer-events-auto fixed bottom-10 left-1/2 z-50 flex items-center gap-6 rounded-full border border-slate-200 bg-white px-6 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)]"
                        >
                            <div className="flex items-center gap-3 font-semibold text-slate-900 text-[14px]">
                                <span className="bg-indigo-50 text-indigo-600 w-7 h-7 flex items-center justify-center rounded-full text-[13px] font-bold ring-1 ring-indigo-100">{selectedCount}</span>
                                Selected
                            </div>
                            <div className="w-[1px] h-6 bg-slate-200" />
                            <div className="flex items-center gap-1">
                                <button className="flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]">
                                    <Copy className="w-[18px] h-[18px]" /> Copy
                                </button>
                                <button className="flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]">
                                    <Pencil className="w-[18px] h-[18px]" /> Edit Info
                                </button>
                            </div>
                            <div className="w-[1px] h-6 bg-slate-200" />
                            <button className="group flex items-center gap-2 rounded-full px-5 py-2 text-[14px] font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 active:scale-[0.98]">
                                <Trash2 className="w-[18px] h-[18px] transition-transform group-hover:scale-110" /> Delete
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* End Main Table */}

          </div>
        </main>
      </div>
    </MotionWrapper>
  );
}
