import React from 'react';
import CustomSlider from 'components/Slider';
import './App.css';
import ProductTable from 'components/ProductTable';

const App = () => {
  return (
    <div className="w-100 h-100">
      <CustomSlider />
      <ProductTable />
    </div>
  );
};

export default App;
