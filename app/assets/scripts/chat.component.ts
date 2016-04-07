import {Component, EventEmitter} from 'angular2/core';
import {AutosizeDirective} from './autosize.directive';

export class Message {
    username: string;
    content: string;
}

var MESSAGES: Message[] = [
    { username: "Mr. Nice", content: "We want to start the TypeScript compiler" },
    { username: "Narco", content: "This will keep the application running while we continue to build the Tour of Heroes." },
    { username: "Bombasto", content: "Let’s create an array of ten heroes at the bottom" },
];

@Component({
    selector: 'div[name=chat]',
    templateUrl: '/partials/chat.html',
    directives: [AutosizeDirective],
})

export class ChatComponent {

    messages: Message[];
    iMessage: string;

    constructor() {
        this.messages = MESSAGES;
        this.iMessage = null;
    }

    send(message: string) {
        this.iMessage = null;
    }
}