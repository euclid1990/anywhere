import {Directive, ElementRef, Renderer, Input, Output, EventEmitter} from 'angular2/core';

// Get jQuery and Autosize Function
declare var $: any;
declare var autosize: any;

@Directive({
    selector: '[autosize]',
    host: {
        '(keyup.enter)': 'updateAutosize($event)'
    }
})

export class AutosizeDirective {

    @Input('autosizeMsg') autosizeMsg: string = null;
    @Output('msgChange') updateMsg: EventEmitter<any> = new EventEmitter();
    private selector: any;

    constructor(el: ElementRef, renderer: Renderer) {
        this.selector = $(el.nativeElement);
        if (typeof autosize != 'undefined') {
            autosize(this.selector);
        }
    }

    updateAutosize(value) {
        var self = this;
        console.log(this.autosizeMsg);
        if (this.autosizeMsg == null || this.autosizeMsg.replace(/(\r\n|\n|\r)/gm, '') == '') {
            setTimeout(function() {
                console.log(1);
                autosize.update(self.selector);
            }, 1050);
        };
    }
}