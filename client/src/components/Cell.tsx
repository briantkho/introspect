import React from 'react';

type CellDataType = {
  title: string;
  desc?: string;
};

type CellType = {
  data: CellDataType;
};

const Cell = ({ data }: CellType) => {
  return (
    <div className="bg-white-cell dark: bg-dark-cell w-max">
      <h1>{data.title}</h1>
    </div>
  );
};

export default Cell;
