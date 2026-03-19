"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const posts = [
  { id: 1, name: "Amazing-Shirt", date: "16 Dec 2023", quality: 5, potential: "25k-46k", reach: "39,789", status: "Edit" },
  { id: 2, name: "Best Shoes", date: "15 Dec 2023", quality: 4, potential: "15k-35k", reach: "29,335", status: "Delete" },
  { id: 3, name: "Iphone Tricks", date: "16 Dec 2023", quality: 5, potential: "9k-16k", reach: "12,590", status: "Edit" },
  { id: 4, name: "Amazing-Shirt", date: "16 Dec 2023", quality: 4, potential: "25k-46k", reach: "39,789", status: "Delete" },
  { id: 5, name: "Best Shoes", date: "15 Dec 2023", quality: 5, potential: "15k-35k", reach: "29,335", status: "Edit" },
];

export function PostPerformanceTable() {
  const router = useRouter();
  return (
    <div className="w-full bg-surface-elevated rounded-[2rem] border border-black/5 overflow-hidden">
      <div className="p-6 border-b border-black/5 flex items-center justify-between">
        <h3 className="text-base font-semibold text-text-primary">Recent Posts Performance</h3>
        <select className="bg-surface-interactive/50 border border-black/5 rounded-lg px-2 py-1 text-xs text-text-secondary outline-none focus:border-accent-primary/40">
          <option>Sort By</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-black/5 text-[10px] uppercase tracking-widest text-text-tertiary">
              <th className="py-4 px-6 font-medium">Post Name</th>
              <th className="py-4 px-6 font-medium">Created</th>
              <th className="py-4 px-6 font-medium">Quality</th>
              <th className="py-4 px-6 font-medium text-center">Potential Reach</th>
              <th className="py-4 px-6 font-medium text-center">Actual Reach</th>
              <th className="py-4 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((post) => (
              <tr key={post.id} onClick={() => router.push(`/posts/${post.id}`)} className="group hover:bg-surface-interactive/30 transition-colors cursor-pointer">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-surface-interactive border border-black/5 flex items-center justify-center overflow-hidden">
                       <img src={`https://picsum.photos/seed/${post.name}/80/80`} alt={post.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{post.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs text-text-secondary">{post.date}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-3 w-3", i < post.quality ? "fill-warning text-warning" : "text-text-primary/10")} />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="text-xs text-text-secondary">{post.potential}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="text-xs text-text-primary font-mono">{post.reach}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Badge 
                    variant={post.status === "Edit" ? "success" : "danger"}
                    className="cursor-pointer hover:brightness-110 active:scale-95 transition-all"
                  >
                    {post.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
