import { format, sub } from 'date-fns';

import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { injectQuery } from '@tanstack/angular-query-experimental';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularQueryDevtools,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private fb = inject(NonNullableFormBuilder);

  filters = this.fb.group({
    startDate: [format(sub(new Date(), { days: 1 }), 'yyyy-MM-dd')],
    endDate: [format(new Date(), 'yyyy-MM-dd')],
  });

  searchSet = signal<null | { startDate: string; endDate: string }>(null);

  dashboardQuery = injectQuery(() => ({
    queryKey: ['dashboard', this.searchSet()] as const,
    queryFn: async ({ queryKey }) => {
      await sleep(2000);
      return `Your data for ${queryKey[1]?.startDate} - ${queryKey[1]?.endDate}`;
    },
    enabled: !!this.searchSet(),
    staleTime: 1000 * 60 * 10,
  }));

  constructor() {
    effect(() => {
      const data = this.dashboardQuery.data();
      console.log(data, 'QUERY DATA CHANGE');
    });
  }

  search() {
    const filters = this.filters.getRawValue();

    this.searchSet.set(filters);
  }
}
