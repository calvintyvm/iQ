import React from "react";
import GeneralKContainer from "./GeneralKContainer";
import { Questions } from "../../../api/questions";
import { Meteor } from "meteor/meteor";
import { Scores } from "../../../api/scores";
import { Mongo } from "meteor/mongo";

const Question = props => {
  let quizzes = props.allQuestions.results;
  const newQuestions = [];
  let current = props.current;
  let correctAnswer = props.answer.splice(10, 10);
  let incorrectAnswer = props.incorrectAnswer;
  let score = props.score;
  let allQuestions = [];
  let newQuizzes = quizzes;

  {
    Meteor.call("scores.addScore");
  }
  {
    quizzes &&
      quizzes.map((question, index) => {
        return (
          <div key={index}>
            {current == index ? (
              <div>
                {props.addQuestions(question)}
                {allQuestions.push(question.correct_answer)}
                {question.incorrect_answers.map((answers, index) => {
                  allQuestions.push(answers);
                })}
              </div>
            ) : null}
          </div>
        );
      });
  }

  let handleChange = e => {
    e.preventDefault();
    const selected = e.target.value;
    props.showQuestion();
    console.log("hello");
    console.log(props.showQ);
    let test = correctAnswer.find(function(element) {
      if (element == selected) {
        Meteor.call("scores.plusScore");
        console.log("its right");
        props.setCurrent(current + 1);
        console.log(props.isCorrectAnswer);
        props.isCorrect();
      } else if (correctAnswer.includes(selected) == false) {
        Meteor.call("scores.sameScore");
        console.log("its wrong");
        props.setCurrent(current + 1);
        props.isIncorrect();
      }
    });
  };
  let decodeEntities = encodedString => {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">"
    };
    return encodedString
      .replace(translate_re, function(match, entity) {
        return translate[entity];
      })
      .replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        {quizzes &&
          quizzes.map((question, index) => {
            return (
              <div key={index}>
                {current == index ? (
                  <div className="questionContainer">
                    <br />
                    <h2 className="card-title">
                      {decodeEntities(question.question)}
                    </h2>
                    {allQuestions
                      .sort(function(a, b) {
                        return 0.5 - Math.random();
                      })
                      .map((question, index) => {
                        return (
                          <div className="card-text">
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={handleChange}
                              key={index}
                              value={question}
                            >
                              {decodeEntities(question)}
                            </button>
                          </div>
                        );
                      })}
                    <br />
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Question;
