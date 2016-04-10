import {Directive, ElementRef, Renderer} from 'angular2/core';
import {Input, Output, EventEmitter} from 'angular2/core';
import {EmitterService} from '../services/emitter.service';

// Get jQuery and Autosize Function
declare var $: any;

@Directive({
    selector: '[autoscroll]'
})

export class AutoscrollDirective {

    private selector: any;
    emitter: EventEmitter<any> = EmitterService.get('channel_autoscroll');

    @Input('autoscrollUpdate') set content(value: boolean) {
        if (value) {
            this.autoscroll(this.selector);
        }
    }

    constructor(el: ElementRef, renderer: Renderer) {
        let self = this;
        this.selector = $(el.nativeElement);
        this.autoscroll(this.selector);
        this.emitter.subscribe(update => {
            if (update) {
                self.autoscroll(self.selector);
            }
        });
    }

    autoscroll(selector: any) {
        selector.animate({scrollTop: selector.prop('scrollHeight')}, 0);
    }
}