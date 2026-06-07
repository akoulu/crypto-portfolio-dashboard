import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

type StatTone = 'violet' | 'rose' | 'cyan' | 'gold';

interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  tone: StatTone;
}

@Component({
  selector: 'app-stats-cards',
  imports: [MatIcon],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.scss',
})
export class StatsCards {
  readonly cards: StatCard[] = [
    {
      label: 'Total balance',
      value: '$24,580',
      change: '+4.2%',
      positive: true,
      icon: 'account_balance_wallet',
      tone: 'violet',
    },
    {
      label: '24h change',
      value: '+$982',
      change: 'Hot streak',
      positive: true,
      icon: 'trending_up',
      tone: 'rose',
    },
    {
      label: 'Assets',
      value: '12',
      change: '+2 new',
      positive: true,
      icon: 'token',
      tone: 'cyan',
    },
    {
      label: 'All-time P&L',
      value: '+$3.4K',
      change: '+16.1%',
      positive: true,
      icon: 'show_chart',
      tone: 'gold',
    },
  ];
}
