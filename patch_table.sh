#!/bin/bash
cat << 'INNEREOF' > temp_replace.js
                          <td className="px-6 py-5 align-middle">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hi
dden border border-slate-200 flex-shrink-0 shadow-sm bg-slate-100">
                                <img src={`https://i.pravatar.cc/150?u=${post.id}`} alt="Author" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span onClick={() => router.push(`/posts/${post.id}`)} className="font-semibold text-slate-900 text-[15px] truncate mb-0.5 cursor-pointer hover:text-indigo-600 transition-colors">{post.title}</span>
                                <span className="text-[13px] text-slate-500 truncate">{post.platform}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 align-middle text-[14px] text-slate-500 font-mono">{post.id.slice(0, 8)}</td>
                          <td className="px-6 py-5 align-middle font-semibold text-slate-900 text-[14px]">{post.platform.slice(0,2).toUpperCase()}</td>
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
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleEditClick(post)} className="rounded-lg p-1.5 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700 title="Edit">
                                <Pencil className="w-[18px] h-[18px]" />
                              </button>
                              <button onClick={() => handleDeleteClick(post.id)} className="rounded-lg p-1.5 text-red-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-700 title="Delete">
                                <Trash2 className="w-[18px] h-[18px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
INNEREOF
sed -i -e '/<td className="px-6 py-5 align-middle">/,/<\/tr>/c\' -e "$(cat temp_replace.js)" src/app/all-posts/page.tsx
rm temp_replace.js
