import React from "react";
import AppHeader from "../AppHeader";
import PostAddForm from "../PostAddForm/PostAddForm";
import PostList from "../PostList";
import PostStatusFilter from "../PostStatusFilter";
import SearchPanel from "../SearchPanel/SearchPanel";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "Going to learn React JS",
          important: false,
          like: false,
          id: "1",
        },
        { label: "That is so good", important: false, like: false, id: "2" },
        { label: "I need a break...", important: false, like: false, id: "3" },
      ],
      term: "",
      filter: "all",
    };

    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, ...after];
      return {
        data: newArr,
      };
    });
  };

  addItem = (body) => {
    const newItem = {
      label: body,
      important: false,
      like: false,
      id: this.maxId++,
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = { ...oldItem, important: !oldItem.important };
      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];
      return {
        data: newArr,
      };
    });
  };

  onToggleLiked = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = { ...oldItem, like: !oldItem.like };
      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];
      return {
        data: newArr,
      };
    });
  };
  searchPost = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1;
    });
  };
  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    if (filter === "like") {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  };
  onFilterSelect = (filter) => {
    this.setState({ filter });
  };
  render() {
    const { data, term, filter } = this.state;
    const liked = data.filter((item) => item.like).length;
    const allPosts = data.length;
    const importantPost = data.filter((item) => item.important).length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    return (
      <div className="app">
        <AppHeader
          liked={liked}
          allPosts={allPosts}
          importantPost={importantPost}
        />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
          posts={visiblePosts}
          onDelete={this.deleteItem}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
