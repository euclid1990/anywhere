import {Directive, ElementRef, Renderer} from 'angular2/core';
import {Input, Output} from 'angular2/core';

// Get jQuery and Autosize Function
declare var $: any;
declare var autosize: any;

@Directive({
    selector: '[autosize]',
    host: {
        '(keyup.enter)': 'changeAutosize($event)'
    }
})

export class AutosizeDirective {

    private selector: any;

    @Input('autosizeUpdate') set content(value: string) {
        if ((typeof autosize != 'undefined') && (value == null)) {
            autosize.update(this.selector);
        }
    }

    constructor(el: ElementRef, renderer: Renderer) {
        this.selector = $(el.nativeElement);
        if (typeof autosize != 'undefined') {
            autosize(this.selector);
        }
    }

    changeAutosize($event :any) {
        /*
        if (typeof autosize != 'undefined') {
            autosize(this.selector);
            this.selector.val('');
        }
        */
    }
}