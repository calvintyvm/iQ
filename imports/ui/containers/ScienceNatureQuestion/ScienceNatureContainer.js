import React, { Component } from "react";
import Questionss from "./Questions";
import Score from "../Score";
import { Questions } from "../../../api/questions";
import { Meteor } from "meteor/meteor";
import { Scores } from "../../../api/scores";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import QuizResultsMessageContainer from "../../components/QuizResultMessage";
import QuizResultsFinishContainer from "../../components/QuizResultsFinish";
import { BubbleSpinLoader } from "react-css-loaders";
//ask about redirect or this way
// import { Route, Redirect } from "react-router";

class ScienceNatureContainer extends Component {
  constructor() {
    super();
    this.state = {
      allQuestions: [],
      isLoading: false,
      score: 0,
      current: 0,
      answer: [],
      incorrectAnswer: [],
      showQuestion: false,
      isCorrectAnswer: true,
      category: "Science & Nature"
    };
  }
  //film
  componentDidMount() {
    const questionLink =
      "https://opentdb.com/api.php?amount=10&category=17&type=multiple";
    this.setState({ isLoading: true });
    fetch(questionLink)
      .then(allQuestions => allQuestions.json())
      .then(allQuestions => this.setState({ allQuestions }))
      .then(() => this.setState({ isLoading: false }))
      .catch(error => console.log(error));
  }

  addQuestions(questions) {
    Meteor.call("questions.addQuestions", questions);
  }
  addScore(question) {
    Meteor.call("questions.addScore", question);
  }
  addRouteSN(category) {
    Meteor.call("questions.addRouteSN", category);
  }

  setCurrent(current) {
    this.setState({ current });
  }

  showQuestion() {
    this.setState({ showQuestion: true });
  }

  showQuestions() {
    this.setState({ showQuestion: false });
    Meteor.call("questions.dropData");
    this.setState({ isCorrect: false });
  }
  isCorrect() {
    this.setState({ isCorrectAnswer: true });
  }
  isIncorrect() {
    this.setState({ isCorrectAnswer: false });
  }

  render() {
    let quizzes = this.state.allQuestions.results;
    quizzes &&
      quizzes.map((question, index) => {
        this.state.answer.push(question.correct_answer);
        this.state.incorrectAnswer.push(question.incorrect_answers);
      });
    return (
      <div>
        {this.state.isLoading ? (
          <BubbleSpinLoader />
        ) : (
          <div>
            {this.state.current == 10 ? (
              <div>
                <QuizResultsFinishContainer
                  showQuestions={this.showQuestions.bind(this)}
                  isCorrectAnswer={this.state.isCorrectAnswer}
                  questionAnswer={this.props.questionAnswer}
                  users={this.props.users}
                />
              </div>
            ) : this.state.showQuestion == false ? (
              <div>
                {this.addRouteSN(this.state.category)}
                <Questionss
                  current={this.state.current}
                  setCurrent={this.setCurrent.bind(this)}
                  addQuestions={this.addQuestions.bind(this)}
                  allQuestions={this.state.allQuestions}
                  score={this.state.score}
                  answer={this.state.answer}
                  incorrectAnswer={this.state.incorrectAnswer}
                  addScore={this.addScore.bind(this)}
                  // plusScore={this.plusScore.bind(this)}
                  showQuestion={this.showQuestion.bind(this)}
                  // showQuestions={this.showQuestions.bind(this)}
                  showQ={this.state.showQuestion}
                  isCorrectAnswer={this.state.isCorrectAnswer}
                  isCorrect={this.isCorrect.bind(this)}
                  isIncorrect={this.isIncorrect.bind(this)}
                  currentQuestion={this.props.questionAnswer}
                />
              </div>
            ) : (
              <QuizResultsMessageContainer
                showQuestions={this.showQuestions.bind(this)}
                isCorrectAnswer={this.state.isCorrectAnswer}
                questionAnswer={this.props.questionAnswer}
                users={this.props.users}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

//if points == user do that
const newScienceNatureContainer = withTracker(() => {
  Meteor.subscribe("scores");
  Meteor.subscribe("questions");
  Meteor.subscribe("users");
  return {
    scores: Scores.find({ points: { $gt: 1 } }).fetch(),
    questionAnswer: Questions.findOne(),
    users: Meteor.users.find().fetch()
  };
})(ScienceNatureContainer);

export default newScienceNatureContainer;
