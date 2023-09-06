import Post from "../components/Post/Post";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";

const Timeline = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      <div>
        <Sidebar />
      </div>
      <div className="col-span-2">
        <Post
          currentUserFullName="Omar Mohamed"
          currentUserImage="https://i.pinimg.com/564x/c7/58/a5/c758a5b04e0e7080dc19187e8c62a9c3.jpg"
          post={{
            id: 1,
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt qui placeat ducimus minima praesentium necessitatibus deserunt repudiandae ut incidunt! Deleniti numquam maxime ipsa, explicabo iure nesciunt dolores perspiciatis deserunt fugiat sapiente placeat repellendus rem, obcaecati dignissimos illum culpa hic sed accusamus fuga, similique quia optio voluptatem nam? Dolor, nostrum omnis!",
            image:
              "https://i.pcmag.com/imagery/articles/00Iy7r4lqzdcLM9vUdFIZoN-25..v1628272383.jpg",
            likes: 4,
            comments: 2,
            authorFullName: "Omar Mohamed",
            authorTag: "MrGhost",
            authorImage:
              "https://i.pinimg.com/564x/c7/58/a5/c758a5b04e0e7080dc19187e8c62a9c3.jpg",
            date: "2 hours ago",
          }}
        />
      </div>
      <div>
        <Rightbar />
      </div>
    </div>
  );
};

export default Timeline;
