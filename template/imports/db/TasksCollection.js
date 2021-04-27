import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const TasksCollection = new Mongo.Collection('tasks');

export const Task = Class.create({
    name: 'Task',
    collection: TasksCollection,
    fields: {
        text: String,
        isChecked: {
            type: Boolean,
            default: false,
            optional: true,
        },
        userId: String,
        createdAt: Date
    },
    meteorMethods: {
        setIsChecked(isChecked) {
            this.isChecked = isChecked;
            return this.save();
        }
    }
});