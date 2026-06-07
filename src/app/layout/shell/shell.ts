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
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../core/services/theme';

const MOBILE_BREAKPOINT = '(max-width: 959.98px)';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/portfolio': 'Portfolio',
  '/transactions': 'Transactions',
  '/analytics': 'Analytics',
};

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
    MatIconButton,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell implements OnInit, OnDestroy {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly theme = inject(ThemeService);
  private readonly destroy$ = new Subject<void>();

  opened = true;
  isMobile = false;
  sidenavMode: 'side' | 'over' = 'side';
  pageTitle = 'Dashboard';

  readonly isDark = this.theme.isDark;

  ngOnInit(): void {
    this.updatePageTitle(this.router.url);

    this.breakpointObserver
      .observe([MOBILE_BREAKPOINT])
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ matches }) => {
        this.isMobile = matches;
        this.sidenavMode = matches ? 'over' : 'side';
        this.opened = !matches;
        this.syncScrollLock();
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((event) => {
        this.updatePageTitle(event.urlAfterRedirects);
        this.closeSidenavOnMobile();
      });
  }

  ngOnDestroy(): void {
    this.clearScrollLock();
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidenav(): void {
    this.opened = !this.opened;
    this.syncScrollLock();
  }

  onSidenavOpenedChange(opened: boolean): void {
    this.opened = opened;
    this.syncScrollLock();
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  closeSidenavOnMobile(): void {
    if (this.isMobile) {
      this.opened = false;
      this.syncScrollLock();
    }
  }

  private updatePageTitle(url: string): void {
    const path = url.split('?')[0];
    this.pageTitle = PAGE_TITLES[path] ?? 'Dashboard';
  }

  private syncScrollLock(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const lock = this.isMobile && this.opened;
    document.documentElement.classList.toggle('shell-no-scroll', lock);
    document.body.classList.toggle('shell-no-scroll', lock);
  }

  private clearScrollLock(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.classList.remove('shell-no-scroll');
    document.body.classList.remove('shell-no-scroll');
  }
}
