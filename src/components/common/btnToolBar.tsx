import React from "react";

interface BtnToolBarProps {
  onChart: (path: string) => void;
}

const BtnToolBar: React.FC<BtnToolBarProps> = (props) => {
  return (
    <div className="btn-toolbar mb-2 mb-md-0">
      <div className="btn-group me-2">
        <button
          type="button"
          onClick={() => props.onChart("Stocks")}
          className="btn btn-sm btn-outline-secondary"
        >
          Stocks
        </button>
        <button
          type="button"
          onClick={() => props.onChart("Prices")}
          className="btn btn-sm btn-outline-secondary"
        >
          Prices
        </button>
        <button
          type="button"
          onClick={() => props.onChart("Rentals")}
          className="btn btn-sm btn-outline-secondary"
        >
          Rentals
        </button>
      </div>
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary dropdown-toggle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-calendar"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        This week
      </button>
    </div>
  );
};

export default BtnToolBar;
