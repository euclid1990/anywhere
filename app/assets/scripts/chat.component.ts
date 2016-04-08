import {Component, OnInit, EventEmitter, Input} from 'angular2/core';
import {AutosizeDirective} from './autosize.directive';
import {DatabaseService} from './database.service';

type Message = {
    user_id: string;
    user_name: string;
    content: string;
}

@Component({
    selector: 'div[name=chat]',
    templateUrl: '/partials/chat.html',
    directives: [AutosizeDirective],
})

export class ChatComponent implements OnInit {

    @Input('user') user: any;
    isLoading: boolean = true;
    total: number = null;
    messages: any;
    iMessage: string;

    constructor(public dbService: DatabaseService) {
        this.messages = this.dbService.getMessages();
        this.iMessage = null;
    }

    ngOnInit() {
        let self = this;
        this.messages.subscribe((l) => {
            this.isLoading = false;
            self.total = l.length;
            console.log('length', l.length);
        });
    }

    send(message: string) {
        message = message.replace(/^\s+|\s+$/g, '')
        if (message.length) {
            let self = this;
            let msgObj: Message = {
                user_id: this.user.id,
                user_name: this.user.name,
                content: message
            }
            this.dbService.saveMessage(msgObj).then(function(response) {
            }, function(error) {
                console.error(error);
            });
        }
        this.iMessage = null;
    }
}