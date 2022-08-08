import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  value: string;
  /*
   * A stream is a data that arrives over a period of time.
   * rxJS allows to work with the stream of data
   * observable allows to convert an ordinary stream of data into observable 
   * stream of data
   * Observable stream emits the value from stream asynchronously - emits complete
   * signal when stream completes.
   * 
   * ** with this approach you won't be able to call the next on the obserbable
   * only once when the Observable is created. 
   * 
   */
  observable$: Observable<number> = new Observable( (observer) => {
    observer.next(-1);
    observer.next(-2);
    observer.next(-3);
    observer.next(-4);
    observer.next(-5);
     observer.complete(); //after this nothing will be emitted.
     observer.next(-3);
  });

  subject$: Subject<number> = new Subject();
  subjectObservable$: Observable<number> = this.subject$.asObservable();

  /*
   * there are a lot of ways of createing the observable from the library
   * create
    defer
    empty
    from
    fromEvent
    interval
    of
    range
    throwError
    timer

    malcoded
   */
  constructor() { }

  data: number;
  ngOnInit(): void {
    this.observable$.subscribe(result => {
      this.data = result;
      console.log(this.data);
    })
  }

  /**
   * Button handler 
   */
  buttonHandler = () => {
    this.subject$.next(Number(this.value));
  }
}
