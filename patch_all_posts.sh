#!/bin/bash

# Remove the hardcoded POSTS_DATA and update the top level component.

sed -i 's/const POSTS_DATA = \[/const wait = () => {};\n\/*/' src/app/all-posts/page.tsx
sed -i 's/const MINI_CHART_DATA/\*\/\nconst MINI_CHART_DATA/' src/app/all-posts/page.tsx

cat << 'INNEREOF' > temp_replace.js
export default function AllPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<(Post & { selected?: boolean })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await getPosts();
    if (data) {
      setPosts(data.map(p => ({ ...p, selected: false })));
    } else {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async (data: Partial<Post>) => {
    if (modalMode === "create") {
      await createPost(data as any);
    } else if (modalMode === "edit" && selectedPost) {
      await updatePost(selectedPost.id, data);
    }
    await fetchPosts();
  };

  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      await fetchPosts();
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the selected posts?")) return;
    const selectedIds = posts.filter(p => p.selected).map(p => p.id);
    for (const id of selectedIds) {
      await deletePost(id);
    }
    await fetchPosts();
  };

  const selectedCount = posts.filter(p => p.selected).length;
  const isAllSelected = posts.length > 0 && selectedCount === posts.length;

  const toggleAll = () => {
    setPosts(posts.map(p => ({ ...p, selected: !isAllSelected })));
  };

  const toggleSelect = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };
INNEREOF

sed -i -e '/export default function AllPosts() {/,/const toggleSelect/c\' -e "$(cat temp_replace.js)" src/app/all-posts/page.tsx
rm temp_replace.js
