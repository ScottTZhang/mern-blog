import { Button, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); //get url parameters
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevData) => ({
        ...prevData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      //console.log(searchQuery);

      const res = await fetch("/api/post/getposts?" + searchQuery);
      if (!res.ok) {
        setLoading(false);
        return;
      } else {
        const data = await res.json();
        setPosts(data.posts);
        console.log(data.posts);

        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        }
      }
    };
    fetchPosts();
  }, [location.search]);
  //console.log("sidebarData:", sidebarData);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = () => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch("/api/post/getposts?" + searchQuery);
    if (!res.ok) {
      return;
    } else {
      const data = await res.json();
      console.log(data.posts);

      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:border-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="search...."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select
              onChange={handleChange}
              id="sort"
              value={sidebarData.sort}
              className="max-w-xs"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              id="category"
              value={sidebarData.category}
              className="max-w-xs"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button type="submit" className="w-full" color="green" pill>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className=" text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          {" "}
          Posts Results{" "}
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts && posts.length === 0 && (
            <p className="text-gray-500">No posts found</p>
          )}
          {loading && <p className="text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <Button
              className="w-full"
              color="gray"
              pill
              onClick={handleShowMore}
            >
              Show More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
