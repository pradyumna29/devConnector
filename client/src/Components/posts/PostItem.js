import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import avatar from '../common/avatar.png'; //hardcoded avatar
import {
  deletePost,
  addLike,
  removeLike,
} from '../../redux/actions/postActions';

class PostItem extends Component {
  onDeleteClick = id => {
    this.props.deletePost(id);
  };
  onLikeClick = id => {
    this.props.addLike(id);
  };

  onUnlikeClick = id => {
    this.props.removeLike(id);
  };

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/users/${post.user}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={avatar} // post.avatar to be used
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button
              type="button"
              onClick={this.onLikeClick.bind(this, post._id)}
              className="btn btn-light mr-1"
            >
              <i
                className={classnames('fa fa-thumbs-up', {
                  'text-info': this.findUserLike(post.likes),
                })}
              ></i>
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
              type="button"
              onClick={this.onUnlikeClick.bind(this, post._id)}
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fa fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onDeleteClick.bind(this, post._id)}
                className="btn btn-danger mr-1"
              >
                <i className="fa fa-times"></i>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
