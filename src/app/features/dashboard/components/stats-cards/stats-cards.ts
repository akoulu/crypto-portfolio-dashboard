import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
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
      value: '$24,580.42',
      change: '+4.2%',
      positive: true,
      icon: 'account_balance_wallet',
    },
    {
      label: '24h change',
      value: '+$982.15',
      change: '+4.2%',
      positive: true,
      icon: 'trending_up',
    },
    {
      label: 'Assets',
      value: '12',
      change: '+2 this month',
      positive: true,
      icon: 'token',
    },
    {
      label: 'All-time P&L',
      value: '+$3,420.00',
      change: '+16.1%',
      positive: true,
      icon: 'show_chart',
    },
  ];
}
