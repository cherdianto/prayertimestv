import React from 'react';

const RunningText = ({ mosqueName, mosqueLocation }) => {
  return (
    <div className='bg-dark text-light d-flex align-items-center justify-content-center h-100 py-2'>
      <marquee
        marquee
        behavior="scroll"
        scrollamount="3"
        direction="left"
        width="100%"
      >
        <h4>
          Welcome to {mosqueName} - {mosqueLocation}. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Duis tortor nisi, tincidunt et nisl
          hendrerit, iaculis congue tellus. In hac habitasse platea dictumst.
          Nam eu lacus sed odio commodo placerat. Duis non elit suscipit,
          ultricies urna a, fringilla dolor. Nunc viverra aliquet neque, tempor
          sagittis risus pellentesque et. In dolor orci, semper at orci a,
          lobortis sollicitudin purus. Pellentesque id egestas mi. Duis non
          imperdiet nibh. Phasellus dictum aliquet arcu nec maximus. Mauris
          dignissim sit amet sapien a eleifend. Curabitur imperdiet tincidunt
          cursus. Cras porta vel urna quis accumsan.
        </h4>
      </marquee>
    </div>
  );
};

export default RunningText;
