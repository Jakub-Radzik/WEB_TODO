"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = exports.getTask = void 0;
const getTask = (id) => {
    return {
        "_id": '1',
        "name": "name"
    };
};
exports.getTask = getTask;
const getUserTasks = (userId) => {
    return [
        {
            "_id": '1',
            "name": "name"
        },
        {
            "_id": '2',
            "name": "name"
        }, {
            "_id": '3',
            "name": "name"
        }
    ];
};
exports.getUserTasks = getUserTasks;
