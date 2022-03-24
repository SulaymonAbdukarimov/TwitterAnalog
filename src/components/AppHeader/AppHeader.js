import "./AppHeader.css";
const AppHeader = ({ allPosts, liked, importantPost }) => {
  return (
    <div className="app-header d-flex">
      <h1>Sulaymon</h1>
      <h2>
        {allPosts} posts,like {liked}, important {importantPost}
      </h2>
    </div>
  );
};
export default AppHeader;
