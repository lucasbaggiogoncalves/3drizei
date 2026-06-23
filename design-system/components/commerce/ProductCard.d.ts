import * as React from 'react';

/**
 * Storefront product card — image, title, price, optional badge & rating.
 *
 * @startingPoint section="Commerce" subtitle="Storefront product card" viewport="320x420"
 */
export interface ProductCardProps {
  title: string;
  /** Pre-formatted price string, e.g. "R$ 89,90". */
  price: string;
  /** Image URL. Omit for the warm clay placeholder. */
  image?: string;
  /** Corner badge label, e.g. "Novo". */
  badge?: string;
  /** Star rating value. */
  rating?: number;
  /** Review count shown after the rating. */
  ratingCount?: number;
  liked?: boolean;
  onLike?: (liked: boolean) => void;
  onAdd?: () => void;
  style?: React.CSSProperties;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
