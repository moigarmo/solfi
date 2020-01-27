import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Options } from '../common/options';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private options$ = new Subject<Options>();
    private menuOpened$ = new Subject<boolean>();

    constructor () {}

    getMenuState(): Observable<boolean> {
        return this.menuOpened$.asObservable();
    }

    setMenuState(opened: boolean) {
        this.menuOpened$.next(opened);
    }

    getOptions(): Observable<Options> {
        return this.options$.asObservable();
    }

    setOptions(options: Options) {
        this.options$.next(options);
    }
}