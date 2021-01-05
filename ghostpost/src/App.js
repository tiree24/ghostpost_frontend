import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ghostPost: [],
    };
  }

  totalVotes() {
    fetch("http://127.0.0.1:8000/api/post/total/")
      .then((res) => res.json())
      .then((data) => this.setState({ ghostPost: data }));
  }
  boasts() {
    fetch("http://127.0.0.1:8000/api/post/boasts/")
      .then((res) => res.json())
      .then((data) => this.setState({ ghostPost: data }));
  }
  roasts() {
    fetch("http://127.0.0.1:8000/api/post/roasts/")
      .then((res) => res.json())
      .then((data) => this.setState({ ghostPost: data }));
  }
  upVote(id) {
    fetch(`http://127.0.0.1:8000/api/post/${id}/up_vote/`, { method: "GET" });
    window.location.reload();
  }
  downVote(id) {
    fetch(`http://127.0.0.1:8000/api/post/${id}/down_vote/`, { method: "GET" });
    window.location.reload();
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/post")
      .then((res) => res.json())
      .then((data) => this.setState({ ghostPost: data }));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.boasts()}>Boasts</button>
        <button onClick={() => this.roasts()}>Roasts</button>
        <button onClick={() => this.totalVotes()}>Total Votes</button>
        <form id="postForm" onSubmit={this.handleSubmit}>
          <h3>
            User Input:
            <input id="userinput" name="input" type="text" />
          </h3>

          <button>Create Post</button>
        </form>
        <hr class="rounded"></hr>
        {this.state.ghostPost.map((p) => (
          <li>
            PostType:{p.post_type} Content:{p.content} DateCreated:
            {p.date_created} TotalVotes:{p.total_votes}
            <button onClick={() => this.upVote(p.id)}>Upvote</button>
            <button onClick={() => this.downVote(p.id)}>Downvote</button>
          </li>
        ))}
      </div>
    );
  }
}
export default App;
