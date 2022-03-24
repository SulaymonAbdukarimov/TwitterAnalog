import React from "react";
import "./PostListItem.css";

export default class PostListItem extends React.Component {
  render() {
    const {
      label,
      onDelete,
      onToggleImportant,
      onToggleLiked,
      important,
      like,
    } = this.props;

    let classNames = "app-list-item d-flex justify-content-between";
    if (important) {
      classNames += " important";
    }
    if (like) {
      classNames += " like";
    }
    return (
      <li className={classNames}>
        <span className="app-list-item-label" onClick={onToggleLiked}>
          {label}
        </span>
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={onToggleImportant}
            type="button"
            className="btn-star btn-sm"
          >
            <i className="fa fa-star"></i>
          </button>
          <button type="button" onClick={onDelete} className="btn-trash btn-sm">
            <i className="fa-solid fa-trash"></i>
          </button>
          <i className="fa fa-heart"></i>
        </div>
      </li>
    );
  }
}
