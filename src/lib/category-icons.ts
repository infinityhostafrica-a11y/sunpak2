
import {
  Home,
  Briefcase,
  Sprout,
  Factory,
  TrendingUp,
  Map,
} from 'lucide-react';
import { ListingCategory } from '@/types';

export const categoryIcons: Record<ListingCategory, React.ElementType> = {
  residential: Home,
  commercial: Briefcase,
  agricultural: Sprout,
  industrial: Factory,
  investment: TrendingUp,
};
