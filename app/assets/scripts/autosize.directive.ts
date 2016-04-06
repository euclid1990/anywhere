import {Directive, ElementRef, Renderer} from 'angular2/core';
import {Input, Output, EventEmitter} from 'angular2/core';
import {EmitterService} from './emitter.service';

// Get jQuery and Autosize Function
declare var $: any;
declare var autosize: any;

@Directive({
    selector: '[autosize]'
})

export class AutosizeDirective {

    emitter: EventEmitter<any> = EmitterService.get('channel_autoresize');
    private selector: any;

    constructor(el: ElementRef, renderer: Renderer) {
        var self = this;
        this.selector = $(el.nativeElement);
        if (typeof autosize != 'undefined') {
            autosize(this.selector);
        }
        this.emitter.subscribe(update => {
            if (update) {
                autosize.update(self.selector);
            }
        });
    }
}