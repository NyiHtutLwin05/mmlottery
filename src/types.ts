export interface Ticket {
  id: string;
  numbers: number[];
  purchaseDate: Date;
  drawDate: Date;
  price: number;
  status: 'active' | 'drawn' | 'won' | 'lost';
}

export interface User {
  id: string;
  balance: number;
  tickets: Ticket[];
}