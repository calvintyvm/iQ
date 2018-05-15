import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

Meteor.methods({
  //check
  "scores.addScore"() {
    Scores.insert({ name: Meteor.user(), points: 0 });
  },
  //ask
  "scores.plusScore"() {
    console.log("its adding");
    Scores.update(
      { name: Meteor.user() },
      {
        $inc: { points: 1 }
      }
    );
  },
  "scores.dropData"() {
    console.log("its dropped");
    Scores.remove({});
  }
});

export const Scores = new Mongo.Collection("scores");

//when you click ont he game it should be add new plyer with the score and user id
//then when u press on the scores it shoud update + 1
