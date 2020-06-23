import React, { Component } from "react";
import { API } from "aws-amplify";
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import "./Home.css";

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const notes = await this.challenges();
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  challenges() {
    return API.get("notes", "/challenges")
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderNotesList1(notes) {
    const s3URL = 'https://dancetown-app-api-dev-attachmentsbucket-ic13uq6xqxwk.s3.amazonaws.com/private';
    
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? 
          <Card className="card-container"
            key={note.noteId}
            href={`/challenges/${note.noteId}`}
            onClick={this.handleNoteClick}
          >
            <CardMedia
              className="card-video"
              component="video"
              image={s3URL + '/' + note.userId + '/' + note.attachment}
              title="Media"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {note.content.trim().split("\n")[0]}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {"Created: " + new Date(note.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
          : null
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Home Town</h1>
        <p>This is the Home page for all your dance need</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Global challenges:</PageHeader>
        <div className="notes-container">
          {!this.state.isLoading && this.renderNotesList1(this.state.notes)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}
