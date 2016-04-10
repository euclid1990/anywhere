import {Directive, ElementRef, Renderer} from 'angular2/core';
import {Input, Output} from 'angular2/core';

// Get jQuery and Autosize Function
declare var $: any;

@Directive({
    selector: '[modal]',
})

export class ModalDirective {

    public static OPEN: string = 'open';
    public static CLOSE: string = 'close';
    private selector: any;

    @Input('modalActivity') set activity(value: string) {
        if (value !== ModalDirective.OPEN && value !== ModalDirective.CLOSE) {
            return;
        }
        this.selector.foundation(value);
        if (value == ModalDirective.OPEN) {
            this.selector.find('input[name="username"]').focus();
        }
    }

    constructor(el: ElementRef, renderer: Renderer) {
        this.selector = $(el.nativeElement);
    }
}