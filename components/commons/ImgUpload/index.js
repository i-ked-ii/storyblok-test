import React, { useState } from 'react';

const ImgUpload = (props) => {
  const { field, form } = props;
  const [name, setName] = useState('');
  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    setName(file.name);
    const reader = new FileReader();
    // const imgTag = document.getElementById("myimage");
    // imgTag.title = file.name;
    // reader.onload = function(event) {
    //   imgTag.src = event.target.result;
    // };
    reader.readAsDataURL(file);
    form.setFieldValue(field.name, file);
  };

  return (
    // <div>
    //   <input type={'file'} onChange={(o) => handleChange(o)} className={'form-control'}/>
    //   <img src={''} alt="" id={'myimage'}/>
    // </div>
    <div className="my-1 mb-3 custom-file flex border-gray-300 rounded-md shadow-sm flex w-full">
      <input
        type="file"
        className="block w-full sm:text-sm border-gray-300 rounded-l-md rounded-r-none"
        name="cover"
        accept="image/*"
        onChange={(o) => handleChange(o)}
      />
      <label
        className={`custom-file-label h-full bg-gray-300 py-2 px-9 rounded-md ${
          name !== '' ? 'text-black' : 'text-placeholder'
        }`}
        htmlFor="inputGroupFile03"
      >
        {name !== '' ? name : 'Browser files...'}
      </label>
    </div>
  );
};

export default ImgUpload;
