import { check } from 'meteor/check';
import { Task } from '../db/TasksCollection';


Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    let task = new Task();
    task.text = text;
    task.createdAt = new Date;
    task.userId = this.userId;

    task.save();
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = Task.findOne(taskId);
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    task.remove();
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = Task.findOne(taskId);
    task.callMethod('setIsChecked', isChecked, (err, result) => {
    });
  },
});
