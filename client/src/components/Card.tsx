import React from 'react';
import Cell from './Cell';

type CardType = {
  category?: string;
  data?: any;
};

export const Card = ({ category, data }: CardType) => {
  return (
    <div className="bg-white-bg shadow-lg dark:bg-dark-card dark:shadow-none w-min h-min">
      {category}
      <Cell data={data} />
    </div>
  );
};
