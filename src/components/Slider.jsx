import { useState } from 'react';

import { Slider, SliderLabel } from '@progress/kendo-react-inputs';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css';
import 'bootstrap/dist/css/bootstrap.css';

const CustomSlider = () => {
  const [sliderValue, setValue] = useState(null);

  return (
    <div className="d-flex h-50 justify-content-center align-items-center">
      <div className="mb-1">
        <Slider
          value={sliderValue}
          buttons={true}
          step={1}
          defaultValue={0}
          min={0}
          max={1}
          onChange={(e) => setValue(e.value)}
        >
          <SliderLabel position={0}>0</SliderLabel>
          <SliderLabel position={0.5}>0.5</SliderLabel>
          <SliderLabel position={1}>1</SliderLabel>
        </Slider>
      </div>

      <NumericTextBox
        className="input-field ms-2 mt-4"
        format="p"
        min={0}
        max={1}
        step={0.01}
        placeholder="0%"
        value={sliderValue}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};

export default CustomSlider;
