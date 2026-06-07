import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

const MOBILE_BREAKPOINT = '(max-width: 959.98px)';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatSidenavContent,
    MatToolbar,
    MatIconButton,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell implements OnInit, OnDestroy {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  opened = true;
  isMobile = false;
  sidenavMode: 'side' | 'over' = 'side';

  ngOnInit(): void {
    this.breakpointObserver
      .observe([MOBILE_BREAKPOINT])
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ matches }) => {
        this.isMobile = matches;
        this.sidenavMode = matches ? 'over' : 'side';
        this.opened = !matches;
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.closeSidenavOnMobile());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidenav(): void {
    this.opened = !this.opened;
  }

  closeSidenavOnMobile(): void {
    if (this.isMobile) {
      this.opened = false;
    }
  }
}
