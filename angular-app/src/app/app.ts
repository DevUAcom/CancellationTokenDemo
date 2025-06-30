import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable, Subscription, switchMap, take } from 'rxjs';

const API_ENDPOINT = 'http://localhost:5056/report/';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private http = inject(HttpClient);

  form = new FormGroup({
    report: new FormControl('', Validators.required),
  });

  reportResult$: Observable<string> =
    this.form.controls.report.valueChanges.pipe(
      switchMap((reportPeriod) =>
        this.http.get<string>(`${API_ENDPOINT}${reportPeriod}`)
      )
    );

  ngOnInit(): void {}
}
